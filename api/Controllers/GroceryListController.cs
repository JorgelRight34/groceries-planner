using api.Dtos.GroceryList;
using api.Extensions;
using api.Mappers;
using api.Models;
using api.Repositories;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenHtmlToPdf;


namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroceryListController : ControllerBase
    {
        private readonly IGroceryListRepository _groceryListRepository;
        private readonly IGroceryRepository _groceryRepository;
        private readonly IViewRendererService _viewRendererService;

        public GroceryListController(
            IGroceryListRepository groceryListRepository, 
            IGroceryRepository groceryRepository,
            IViewRendererService viewRendererService
        )
        {
            _groceryListRepository = groceryListRepository;
            _groceryRepository = groceryRepository;
            _viewRendererService = viewRendererService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = User.GetUsername();
            var lists = await _groceryListRepository.GetAllAsync(
                userId
            );
            return Ok(lists?.Select(x => x.ToGroceryListDto()));
        }

        [HttpGet("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var username = User.GetUsername();
            if (username == null) return Unauthorized();

            var groceryList = await _groceryListRepository.GetByIdAsync(id, username);
            if (groceryList == null) return BadRequest();
        
                
            return Ok(groceryList.ToGroceryListDto());
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(
            [FromBody] CreateGroceryListDto groceryListDto
        )
        {
            if (!ModelState.IsValid) return BadRequest();

            var userId = User.GetUsername();
            if (userId == null) return Unauthorized();

            var groceryList = await _groceryListRepository.CreateAsync(
                userId,
                groceryListDto
            );

            return Ok(groceryList);
        }

        [HttpPut("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> Put(
            [FromRoute] Guid id, [FromBody] UpdateGroceryListDto groceryListDto
        )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userId = User.GetUsername();
            if (userId == null) return Unauthorized();

            var groceryList = await _groceryListRepository.UpdateAsync(
                    id, userId, groceryListDto
            );

            if (groceryList == null) return NotFound();

            return Ok(groceryList);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var userId = User.GetUsername();
            var groceryList = await _groceryListRepository.DeleteAsync(userId, id);

            if (groceryList == null) return NotFound();

            return NoContent();
        }

        [HttpPost("save-groceries-list")]
        [Authorize]
        public async Task<IActionResult> SaveGroceriesList(
            [FromBody] SaveGroceryListDto saveGroceryListDto
        )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            

            var userId = User.GetUsername();
            if (userId == null) return Unauthorized();

            var groceryList = await _groceryListRepository.UpdateAllGroceriesAsync(
                userId, saveGroceryListDto.Id, saveGroceryListDto.Groceries
            );

            if (groceryList == null) return NotFound();

            return NoContent();
        }

        [HttpPost("export-pdf")]
        [Authorize]
        public async Task<IActionResult> ExportToPdf([FromBody] ExportGroceryListDto groceryList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            string htmlContent = "";
            try
            {
                htmlContent = await _viewRendererService.RenderAsync(
                    "/Views/Templates/GroceryList.cshtml", groceryList
                );
            } catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500);
            }
          

            byte[] pdfBytes = Pdf.From(htmlContent).Content();

            return File(pdfBytes, "application/pdf", "document.pdf");
        }
    }
}
