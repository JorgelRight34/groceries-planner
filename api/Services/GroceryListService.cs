using api.Dtos.Grocery;

namespace api.Services
{
    public class GroceryListService : IGroceryListService
    {
        public Task<IEnumerable<GroceryDto>> GetGroceryList(int id)
        {
            throw new NotImplementedException();
        }
    }
}
