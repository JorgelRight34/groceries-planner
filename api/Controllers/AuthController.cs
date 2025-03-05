using api.Dtos.User;
using api.Extensions;
using api.Mappers;
using api.Models;
using api.Services;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Security.Claims;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager; 
        private readonly ITokenService _tokenService;
       
        public AuthController(
            UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager,
            ITokenService tokenService
        )
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager; 
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (String.IsNullOrEmpty(userId))
            {
                return Unauthorized("No user id provided on the token.");
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
            {
                return Unauthorized("Didn't find user");
            }

            return Ok(user.ToUserDto());
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CreateUserDto createUserDto)
        {
            try
            {
                // Check if data is valid
                if (!ModelState.IsValid) return BadRequest(ModelState);

                // Create new user
                var user = new AppUser
                {
                    UserName = createUserDto.UserName,
                    Email = createUserDto.Email,
                };

                // Let Identity create the user and assign the password
                var createdUser = await _userManager.CreateAsync(
                    user, createUserDto.Password
                 );

                // Only if it succeeded then
                if (createdUser.Succeeded)
                {
                    // Try to assing a role to user
                    var roleResult = await _userManager.AddToRoleAsync(user, "User");

                    if (roleResult.Succeeded) 
                    {
                        var token = _tokenService.CreateToken(user);
             
                        return Ok(new 
                        {
                            User = new
                            {
                                Username = user.UserName,
                                Email = user.Email
                            },
                            Token = token
                        });
                    }
                    return StatusCode(500, roleResult.Errors);
                }

                // Return errors related to user
                return StatusCode(500, createdUser.Errors);
            } catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            // Try to find user by username
            var user = await _userManager.Users.FirstOrDefaultAsync(
                api => api.UserName == loginDto.UserName.ToLower()
            );

            // If user was not found return unathorized
            if (user == null) return Unauthorized();

            // Check if passwords match
            var result = await _signInManager.CheckPasswordSignInAsync(
                user, loginDto.Password, false
            );

            //  If password don't match return unauthorized
            if (!result.Succeeded)
            {
                return Unauthorized("Username or password are invalid.");
            }

            return Ok(new
            {
                User = user.ToUserDto(),
                Token = _tokenService.CreateToken(user)
            });
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> LoginWithGoogle([FromBody] GoogleLoginRequestDto request)
        {
            if (!ModelState.IsValid) return BadRequest();

            try
            {
                // Extract payload from token
                var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token);

                if (payload == null) return BadRequest("Invalid token");
                
                // Get username from token
                var username = payload.Name?.ToUsernameFromGoogleToken();
                if (username == null) return BadRequest();

                // Try to fetch an existing user to determine if user is signing up
                // or logging in
                var existingUser = await _userManager.FindByNameAsync(username);
                if (existingUser != null)
                {
                    if (existingUser.ProfilePicUrl != payload.Picture)
                    {
                        // If user has updated it's google profile pic then
                        // update the profile pic on the database
                        existingUser.ProfilePicUrl = payload.Picture;
                        await _userManager.UpdateAsync(existingUser); 
                    }
                    // If user is logging in generate token and return
                    return Ok(new
                    {
                        User = existingUser.ToUserDto(),
                        Token = _tokenService.CreateToken(existingUser)
                    });
                }

                // User is trying to sign up so create an AppUser
                var user = new AppUser
                {
                    UserName = username,
                    Email = payload.Email,
                    ProfilePicUrl = payload.Picture
                };

                var createdUser = await _userManager.CreateAsync(user);
                if (!createdUser.Succeeded)
                {
                    return BadRequest($"User was not sucessfuly created {createdUser.Errors}");
                }
       
                // Add role to user
                var roleResult = await _userManager.AddToRoleAsync(user, "User");
                if (!roleResult.Succeeded) return StatusCode(500);

                return Ok(new
                {
                    User = user.ToUserDto(),
                    Token = _tokenService.CreateToken(user)
                });    
            } 
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
