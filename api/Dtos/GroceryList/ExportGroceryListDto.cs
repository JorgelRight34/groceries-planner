using api.Dtos.Category;
using api.Dtos.Grocery;

namespace api.Dtos.GroceryList
{
    public class ExportGroceryListDto
    {
        public IEnumerable<ExportCategoryDto>? Monday { get; set; }
        public IEnumerable<ExportCategoryDto>? Tuesday { get; set; }   
        public IEnumerable<ExportCategoryDto>? Wednesday { get; set; } 
        public IEnumerable<ExportCategoryDto>? Thursday {  get; set; }
        public IEnumerable<ExportCategoryDto>? Friday { get; set; }    
        public IEnumerable<ExportCategoryDto>? Saturday { get; set; }
        public IEnumerable<ExportCategoryDto>? Sunday { get; set; }
        
    }
}
