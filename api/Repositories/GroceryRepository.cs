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

        public async Task<Grocery> CreateAsync(Grocery grocery)
        {
            await _context.Groceries.AddAsync(grocery);
            await _context.SaveChangesAsync();
            return grocery;
        }

        public async Task<Grocery?> GetByIdAsync(int id)
        {
            return await _context.Groceries.FindAsync(id);
        }

        public async Task<Grocery?> DeleteAsync(int id)
        {
            var grocery = await _context.Groceries.FindAsync(id);

            if (grocery == null)
            {
                return null;
            }

            _context.Groceries.Remove(grocery);
            await _context.SaveChangesAsync();

            return grocery;
        }

        public async Task<Grocery?> UpdateAsync(int id, UpdateGroceryDto groceryDto)
        {
            var grocery = await _context.Groceries.FindAsync(id);

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
