using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class CreateUserDto
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }   
    }
}
