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
        private readonly IGroceryListService _groceryListService;

        public GroceryListController(
            IGroceryListRepository groceryListRepository, 
            IGroceryRepository groceryRepository,
            IViewRendererService viewRendererService,
            IGroceryListService groceryListService
        )
        {
            _groceryListRepository = groceryListRepository;
            _groceryRepository = groceryRepository;
            _groceryListService = groceryListService;
            _viewRendererService = viewRendererService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = User.GetUsername();
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

            var userId = User.GetUsername();
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

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Put([FromRoute] Guid id, [FromBody] UpdateGroceryListDto groceryListDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userId = User.GetUsername();
            var groceryList = await _groceryListRepository.UpdateAsync(
                    id, userId, groceryListDto
            );

            if (groceryList == null)
            {
                return NotFound();
            }

            return Ok(groceryList);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var userId = User.GetUsername();
            var groceryList = await _groceryListRepository.DeleteAsync(userId, id);

            if (groceryList == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost("save-groceries-list")]
        [Authorize]
        public async Task<IActionResult> SaveGroceriesList([FromBody] Grocery[] groceries)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.GetUsername();

            foreach (var grocery in groceries)
            {
                var groceryDto = grocery.ToUpdateGroceryDto();
                var updatedGrocery = await _groceryRepository.UpdateAsync(
                    grocery.Id, userId, groceryDto
                );

                if (updatedGrocery == null)
                {
                    return NotFound();
                }
            }

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

        [HttpGet("add-member/{groceryListId:Guid}")]
        [Authorize]
        public async Task<IActionResult> AddMember([FromRoute] Guid groceryListId)
        {
            if (!ModelState.IsValid) return BadRequest();

            var username = User.GetUsername();

            if (username == null) return BadRequest();

            var groceryList = await _groceryListService.AddMemberAsync(
                username, groceryListId
            );

            if (groceryList == null)
            {
                return NotFound();
            }

            return Ok(groceryList);
        }
    }
}
