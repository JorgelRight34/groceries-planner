using api.Dtos.GroceryList;
using api.Models;

namespace api.Repositories
{
    public interface IGroceryListRepository
    {
        Task<GroceryList> CreateAsync(string userId, CreateGroceryListDto groceryListDto);
        Task<IEnumerable<GroceryList>?> GetAllAsync(string? userId);
        Task<GroceryList?> UpdateAsync(
            int id, string userId, UpdateGroceryListDto groceryListDto
        );
        Task<GroceryList?> DeleteAsync(string? userId, int id);
    }
}
