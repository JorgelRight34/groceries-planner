using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Grocery
{
    public class CreateGroceryDto
    {
        [Required]
        [MaxLength(255, ErrorMessage = "Name is too long (255 characters max)")]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [Required]
        public double Cost { get; set; }
        [MaxLength(2048)]
        public string? ImageUrl { get; set; }
        [MaxLength(2048)]
        public string? Url { get; set; }
        public int? CategoryId { get; set; }
        public int GroceryListId { get; set; }
        public int Monday { get; set; } = 0;
        public int Tuesday { get; set; } = 0;
        public int Wednesday { get; set; } = 0;
        public int Thursday { get; set; } = 0;
        public int Friday { get; set; } = 0;
        public int Saturday { get; set; } = 0;
        public int Sunday { get; set; } = 0;
    }
}
