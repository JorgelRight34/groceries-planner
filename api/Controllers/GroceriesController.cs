using api.Dtos.Grocery;
using api.Extensions;
using api.Mappers;
using api.Models;
using api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroceriesController : ControllerBase
    {
        private readonly IGroceryRepository _groceryRepository;
        public GroceriesController(IGroceryRepository groceryRepository)
        {
            _groceryRepository = groceryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await _groceryRepository.GetAllAsync();
            return Ok(data);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var userId = User.GetUsername();
            var data = await _groceryRepository.GetByIdAsync(id, userId!);

            if (data == null)
            {
                return NotFound();
            }

            return Ok(data.ToGroceryDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(
            [FromBody] CreateGroceryDto groceryDto
        )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.GetUsername();
            var grocery = groceryDto.ToGroceryFromCreateDto();
            var data = await _groceryRepository.CreateAsync(grocery);

            if (data == null)
            {
                return NotFound();
            }

            return CreatedAtAction(
                nameof(Get), new { id = grocery.Id }, grocery
            );
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Put(
            [FromRoute] int id,
            [FromBody] UpdateGroceryDto groceryDto
        )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.GetUsername();
            var grocery = await _groceryRepository.UpdateAsync(
                id, userId, groceryDto
            );

            if (grocery == null)
            {
                return NotFound();
            }

            return Ok(grocery);
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var userId = User.GetUsername();
            var grocery = await _groceryRepository.DeleteAsync(id, userId);

            if (grocery == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
