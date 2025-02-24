using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Category
{
    public class CreateCategoryDto
    {
        [Required]
        public string Name { get; set; } = String.Empty;
    }
}
