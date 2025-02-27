using api.Dtos.GroceryList;
using api.Mappers;
using api.Models;
using api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroceryListController : Controller
    {
        private readonly IGroceryListRepository _groceryListRepository;
        private readonly IGroceryRepository _groceryRepository;
        private readonly UserManager<AppUser> _userManager;
        public GroceryListController(
            IGroceryListRepository groceryListRepository, 
            IGroceryRepository groceryRepository, 
            UserManager<AppUser> userManager
        )
        {
            _groceryListRepository = groceryListRepository;
            _groceryRepository = groceryRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }

            var lists = await _groceryListRepository.GetAllAsync(
                userId
            );
            return Ok(lists);
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] CreateGroceryListDto groceryListDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }

            var groceryList = await _groceryListRepository.CreateAsync(
                userId,
                groceryListDto
            );

            return Ok(groceryList);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }

            var groceryList = await _groceryListRepository.DeleteAsync(userId, id);

            if (groceryList == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        [Route("save-groceries-list")]
        public async Task<IActionResult> SaveGroceriesList([FromBody] Grocery[] groceries)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (var grocery in groceries)
            {
                var groceryDto = grocery.ToUpdateGroceryDto();
                var updatedGrocery = await _groceryRepository.UpdateAsync(grocery.Id, groceryDto);

                if (updatedGrocery == null)
                {
                    return NotFound();
                }

            }

            return NoContent();
        }

        [HttpPost("export-pdf")]
        [Authorize]
        public async Task<IActionResult> ExportToPdf([FromBody] GroceryList groceryList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var renderer = new ChromePdfRenderer();
            var pdf = renderer.RenderHtmlAsPdf("<h1>Excellent</h1>");

            var pdfBytes = pdf.BinaryData;

            return File(pdfBytes, "application/pdf", $"{groceryList.Name}.pdf");
        }
    }
}
