using api.Data;
using api.Dtos.Grocery;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class GroceryRepository : IGroceryRepository
    {
        private readonly ApplicationDbContext _context;
        public GroceryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GroceryDto>> GetAllAsync()
        {
            var data = await _context.Groceries.
                Include(grocery => grocery.Category).
                Select(grocery => grocery.ToGroceryDto()).
                ToListAsync();

            return data;
        }

        public async Task<Grocery?> CreateAsync(Grocery grocery)
        {
            var groceryList = await _context.GroceryLists.FindAsync(grocery.GroceryListId);
            if (groceryList == null)
            {;
                return null;
            }

            var category = await _context.Categories.FindAsync(grocery.CategoryId);
            if (category == null)
            {
                return null;
            }

            await _context.Groceries.AddAsync(grocery);
            await _context.SaveChangesAsync();
            return grocery;
        }

        public async Task<Grocery?> GetByIdAsync(int id, string? userId)
        {
            if (userId == null)
            {
                return null;
            }

            var grocery = await _context.Groceries
                .Include(x => x.GroceryList)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (grocery == null || grocery?.GroceryList?.UserId != userId)
            {
                return null;
            }

            return grocery;
        }

        public async Task<Grocery?> DeleteAsync(int id, string? userId)
        {
            var grocery = await this.GetByIdAsync(id, userId);

            if (grocery == null)
            {
                return null;
            }

            _context.Groceries.Remove(grocery);
            await _context.SaveChangesAsync();

            return grocery;
        }

        public async Task<Grocery?> UpdateAsync(int id, string? userId, UpdateGroceryDto groceryDto)
        {
            var grocery = await this.GetByIdAsync(id, userId);

            if (grocery == null)
            {
                return null;
            }

            grocery.Name = groceryDto.Name;
            grocery.Description = groceryDto.Description;
            grocery.Cost = groceryDto.Cost;
            grocery.ImageUrl = groceryDto.ImageUrl;
            grocery.Url = groceryDto.Url;

            // Days
            grocery.Monday = groceryDto.Monday;
            grocery.Tuesday = groceryDto.Tuesday;
            grocery.Wednesday = groceryDto.Wednesday;
            grocery.Thursday = groceryDto.Thursday;
            grocery.Friday = groceryDto.Friday;
            grocery.Saturday = groceryDto.Saturday;
            grocery.Sunday = groceryDto.Sunday;

            await _context.SaveChangesAsync();

            return grocery;
        }
    }
}
