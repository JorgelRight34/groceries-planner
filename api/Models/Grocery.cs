using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Grocery
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        [Required]
        public double Cost { get; set; }
        public string? ImageUrl { get; set; }
        public string? Url { get; set; }
        public int Monday { get; set; } = 0;
        public int Tuesday { get; set; } = 0;
        public int Wednesday { get; set; } = 0;
        public int Thursday { get; set; } = 0;
        public int Friday { get; set; } = 0;
        public int Saturday { get; set; } = 0;
        public int Sunday { get; set; } = 0;
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
     }
}
