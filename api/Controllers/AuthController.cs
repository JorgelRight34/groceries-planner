using api.Dtos.User;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
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

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CreateUserDto createUserDto)
        {
            try
            {
                // Check if data is valid
                if (!ModelState.IsValid) 
                {
                    return BadRequest(ModelState);
                }

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
                        var data = new
                        {
                            User = new 
                            {
                                Username = user.UserName,
                                Email = user.Email
                            },
                            Token = token
                        };

                        return Ok(data);
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
            if (user == null)
            {
                return Unauthorized();
            }

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
    }
}
