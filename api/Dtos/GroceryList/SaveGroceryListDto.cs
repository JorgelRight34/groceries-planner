using System.ComponentModel.DataAnnotations;
using api.Dtos.Grocery;

namespace api.Dtos.GroceryList
{
    public class SaveGroceryListDto
    {
        [Required]
        public Guid Id { get; set; }
        [Required]  
        public IEnumerable<GroceryDto>? Groceries { get; set; }    
    }
}
