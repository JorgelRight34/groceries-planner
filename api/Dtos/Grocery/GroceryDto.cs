namespace api.Dtos.Grocery
{
    public class GroceryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Cost { get; set; }
        public string? ImageUrl { get; set; }
        public string? Url { get; set; }
        public int Monday { get; set; } = 0;
        public int Tuesday { get; set; } = 0;
        public int Wednesday { get; set; } = 0;
        public int Thursday { get; set; } = 0;
        public int Friday { get; set; } = 0;
        public int Saturday { get; set; } = 0;
        public int Sunday { get; set; } = 0;
    }
}
