using api.Dtos.Category;
using api.Models;

namespace api.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync();       
        Task<Category> CreateAsync(Category category);
        Task<CategoryDto?> GetByIdAsync(int id);
        Task<Category?> UpdateAsync(int id, UpdateCategoryDto categoryDto);
        Task<Category?> DeleteAsync(int id);
    }
}
