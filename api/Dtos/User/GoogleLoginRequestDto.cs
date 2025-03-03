using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class GoogleLoginRequestDto
    {
        [Required]
        public string? Token { get; set; }
    }
}
