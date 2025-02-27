using api.Dtos.GroceryList;
using api.Models;

namespace api.Mappers
{
    public static class GroceryListMapper
    {
        public static GroceryList ToGroceryListFromCreateDto(this CreateGroceryListDto groceryListDto)
        {
            return new GroceryList
            {
                Name = groceryListDto.Name,
                Description = groceryListDto.Description,
            };
        }
    }
}
