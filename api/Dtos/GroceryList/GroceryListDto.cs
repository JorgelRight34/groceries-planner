using api.Dtos.Grocery;
using api.Dtos.GroceryListMember;
using api.Dtos.User;
using api.Models;

namespace api.Dtos.GroceryList
{
    public class GroceryListDto
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? Name { get; set; }
        public string? Description { get; set; }
        public UserDto? User { get; set; }
        public List<GroceryDto>? Groceries { get; set; }
        public List<UserDto?>? Members { get; set; }
    }
}
