using api.Data;
using api.Dtos.Category;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }


        public async Task<Category?> DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            
            if (category == null)
            {
                return null;
            }

            _context.Categories.Remove(category);
            return category;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync()
        {
            var categories = await _context.Categories.
                Select(category => category.ToCategoryDto()).
                ToListAsync();

            return categories;
        }

        public async Task<CategoryDto?> GetByIdAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return null;
            }

            return category.ToCategoryDto();
        }

        public async Task<Category?> UpdateAsync(int id, UpdateCategoryDto categoryDto)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return null;
            };

            category.Name = categoryDto.Name;

            await _context.SaveChangesAsync();

            return category;
        }
    }
}
