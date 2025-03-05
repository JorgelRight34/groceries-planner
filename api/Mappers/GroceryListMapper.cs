using api.Dtos.GroceryList;
using api.Models;
using System.Linq;

namespace api.Mappers
{
    public static class GroceryListMapper
    {
        public static GroceryListDto ToGroceryListDto(this GroceryList groceryList)
        {
            return new GroceryListDto
            {
                Name = groceryList.Name,
                Description = groceryList.Description,
                User = groceryList.User?.ToUserDto(),
                Groceries = groceryList.Groceries?.Select(g => g.ToGroceryDto()).ToList(),
                Members = groceryList.Members?.Select(m => m.User?.ToUserDto()).ToList()
            };
        }
        public static GroceryList ToGroceryListFromCreateDto(
            this CreateGroceryListDto groceryListDto
        )
        {
            return new GroceryList
            {
                Name = groceryListDto.Name,
                Description = groceryListDto.Description,
            };
        }
    }
}
