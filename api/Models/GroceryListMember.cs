using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class GroceryListMember
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? UserId { get; set; }
        public Guid GroceryListId { get; set; }
        [ForeignKey("UserId")]
        public AppUser? User { get; set; }
        [ForeignKey("GroceryListId")]
        public GroceryList? GroceryList { get; set; }
    }
}
