using api.Dtos.Category;
using api.Models;

namespace api.Mappers
{
    public static class CategoryMapper
    {
        public static Category ToCategoryFromCreateCategoryDto(this CreateCategoryDto category)
        {
            return new Category
            {
                Name = category.Name,
            };
        }

        public static Category ToCategoryFromUpdateCategoryDto(this UpdateCategoryDto category)
        {
            return new Category
            {
                Name = category.Name,
            };
        }

        public static CategoryDto ToCategoryDto(this Category category)
        {
            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
            };
        }


    }
}
