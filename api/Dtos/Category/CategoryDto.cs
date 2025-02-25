using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Category
{
    public class CategoryDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = String.Empty;
      
    }
}
