using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class UserDto
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? Email { get; set; }
    }
}
