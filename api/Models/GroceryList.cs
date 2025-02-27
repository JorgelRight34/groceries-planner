using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class GroceryList
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? UserId { get; set; }
        [ForeignKey("UserId")]
        public AppUser? User { get; set; }   
        public List<Grocery>? Groceries { get; set; }
    }
}
