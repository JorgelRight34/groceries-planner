namespace api.Dtos.Grocery
{
    public class CreateGroceryDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Cost { get; set; }
        public string? ImageUrl { get; set; }
        public string? Url { get; set; }
    }
}
