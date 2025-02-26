using api.Dtos.Grocery;
using api.Mappers;
using api.Models;
using api.Repositories;
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
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var data = await _groceryRepository.GetByIdAsync(id);

            if (data == null)
            {
                return NotFound();
            }

            return Ok(data.ToGroceryDto());
        }

        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] CreateGroceryDto groceryDto
        )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grocery = groceryDto.ToGroceryFromCreateDto();
            var data = await _groceryRepository.CreateAsync(grocery);
            return CreatedAtAction(
                nameof(Get), new { id = grocery.Id }, grocery
            );
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(
            [FromRoute] int id,
            [FromBody] UpdateGroceryDto groceryDto
        )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grocery = await _groceryRepository.UpdateAsync(id, groceryDto);
            
            if (grocery == null)
            {
                return NotFound();
            }

            return Ok(grocery);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var grocery = await _groceryRepository.DeleteAsync(id);
            
            if (grocery == null)
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
 
    }
}
