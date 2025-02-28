using api.Dtos.Grocery;

namespace api.Dtos.Category
{
    public class ExportCategoryDto
    {
        public string? Name { get; set; }
        public List<GroceryDto> Groceries { get; set; } = new List<GroceryDto>();
    }
}
