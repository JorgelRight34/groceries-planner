using api.Dtos.Grocery;
using api.Models;

namespace api.Mappers
{
    public static class GroceryMapper
    {
        public static GroceryDto ToGroceryDto(this Grocery grocery)
        {
            return new GroceryDto
            {
                Id = grocery.Id,
                Name = grocery.Name,
                Description = grocery.Description,
                Cost = grocery.Cost,
                ImageUrl = grocery.ImageUrl,
                Url = grocery.Url,
                CategoryId = grocery.CategoryId,
                // Days
                Monday = grocery.Monday,
                Tuesday = grocery.Tuesday,
                Wednesday = grocery.Wednesday,
                Thursday = grocery.Thursday,
                Friday = grocery.Friday,
                Saturday = grocery.Saturday,
                Sunday = grocery.Sunday,
                Category = grocery?.Category?.ToCategoryDto(),
            };
        }
        public static UpdateGroceryDto ToUpdateGroceryDto(this Grocery grocery)
        {
            return new UpdateGroceryDto
            {
                Name = grocery.Name,
                Description = grocery.Description,
                Cost = grocery.Cost,
                ImageUrl = grocery.ImageUrl,
                Url = grocery.Url,
                CategoryId = grocery.CategoryId,
                // Days
                Monday = grocery.Monday,
                Tuesday = grocery.Tuesday,
                Wednesday = grocery.Wednesday,
                Thursday = grocery.Thursday,
                Friday = grocery.Friday,
                Saturday = grocery.Saturday,
                Sunday = grocery.Sunday
            };
        }
        public static Grocery ToGroceryFromCreateDto(this CreateGroceryDto grocery)
        {
            return new Grocery
            {
                Name = grocery.Name,
                Description = grocery.Description,
                Cost = grocery.Cost,
                ImageUrl = grocery.ImageUrl,
                Url = grocery.Url,
                CategoryId = grocery.CategoryId,
                // Days
                Monday = grocery.Monday,
                Tuesday = grocery.Tuesday,
                Wednesday = grocery.Wednesday,
                Thursday = grocery.Thursday,
                Friday = grocery.Friday,
                Saturday = grocery.Saturday,
                Sunday = grocery.Sunday
            };
        }
    }
}
