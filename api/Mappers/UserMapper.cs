using api.Dtos.User;
using api.Models;

namespace api.Mappers
{
    public static class UserMapper
    {
        public static UserDto ToUserDto(this AppUser appUser)
        {
            return new UserDto
            {
                UserName = appUser.UserName,
                Email = appUser.Email,
                ProfilePicUrl = appUser.ProfilePicUrl
            };
        }
    }
}
