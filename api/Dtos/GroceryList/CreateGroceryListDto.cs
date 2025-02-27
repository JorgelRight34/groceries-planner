using System.ComponentModel.DataAnnotations;

namespace api.Dtos.GroceryList
{
    public class CreateGroceryListDto
    {
        [Required]
        public string? Name { get; set; }   
        public string? Description {  get; set; }   
    }
}
