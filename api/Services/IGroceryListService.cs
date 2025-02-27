using api.Dtos.Grocery;
using api.Models;

namespace api.Services
{
    public interface IGroceryListService
    {
        Task<IEnumerable<GroceryDto>> GetGroceryList(int id);
    }
}
