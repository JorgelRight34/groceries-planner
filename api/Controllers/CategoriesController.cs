using api.Dtos.Category;
using api.Mappers;
using api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var categories = await _categoryRepository.GetAllAsync();

            return Ok(categories);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateCategoryDto categoryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var category = await _categoryRepository.CreateAsync(categoryDto.ToCategoryFromCreateCategoryDto());
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category.ToCategoryDto());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] UpdateCategoryDto categoryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var category = await _categoryRepository.UpdateAsync(id, categoryDto);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category.ToCategoryDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var category = await _categoryRepository.DeleteAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
