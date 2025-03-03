using api.Models;

namespace api.Repositories
{
    public interface IGroceryListService
    {
        public Task<GroceryList?> AddMemberAsync(string userId, Guid groceryListId);
    }
}
