using api.Dtos.GroceryListMember;
using api.Models;

namespace api.Mappers
{
    public static class GroceryListMemberMapper
    {
        public static GroceryListMemberDto ToGroceryListMemberDto(
            this GroceryListMember groceryListMember
        )
        {
            return new GroceryListMemberDto
            {
                User = groceryListMember.User?.ToUserDto()
            };
        }
    }
}
