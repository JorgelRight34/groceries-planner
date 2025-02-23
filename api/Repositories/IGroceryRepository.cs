using api.Dtos.Grocery;
using api.Models;

namespace api.Repositories
{
    public interface IGroceryRepository
    {
        Task<IEnumerable<GroceryDto>> GetAllAsync();
        Task<Grocery> CreateAsync(Grocery grocery);
        Task<Grocery?> GetByIdAsync(int id);
        Task<Grocery?> DeleteAsync(int id);
        Task<Grocery?> UpdateAsync(int id, UpdateGroceryDto groceryDto);
    }
}
