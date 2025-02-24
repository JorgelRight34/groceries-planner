using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Category
{
    public class UpdateCategoryDto
    {
        [Required]
        public string Name { get; set; } = String.Empty;
    }
}
