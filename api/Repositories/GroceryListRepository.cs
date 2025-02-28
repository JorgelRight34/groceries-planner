using api.Data;
using api.Dtos.GroceryList;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class GroceryListRepository : IGroceryListRepository
    {
        private readonly ApplicationDbContext _context;
 
        public GroceryListRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<GroceryList> CreateAsync(string userId, CreateGroceryListDto groceryListDto)
        {
            // Create grocery object
            var groceryList = groceryListDto.ToGroceryListFromCreateDto();
            groceryList.UserId = userId;

            // Make queries
            await _context.GroceryLists.AddAsync(groceryList);
            await _context.SaveChangesAsync();

            return groceryList;
        }

        public async Task<GroceryList?> DeleteAsync(string? userId, int id)
        {
            if (userId == null)
            {
                return null;
            }

            var groceryList = await _context.GroceryLists.FindAsync(id);
            if (groceryList == null || groceryList.UserId != userId)
            {
                return null;
            }

            _context.GroceryLists.Remove(groceryList);
            await _context.SaveChangesAsync();
            return groceryList; 
        }

        public async Task<IEnumerable<GroceryList>?> GetAllAsync(string? userId)
        {
            if (userId == null)
            {
                return null;
            }

            var lists = await _context.GroceryLists
                .Where(x => x.UserId == userId)
                .Include(x => x.Groceries)
                .ToListAsync();

            return lists;
        }

        public async Task<GroceryList?> UpdateAsync(int id, string? userId, UpdateGroceryListDto groceryListDto)
        {
            if (userId == null)
            {
                return null;
            }

            var groceryList = await _context.GroceryLists
                .Include(x => x.Groceries)
                .FirstOrDefaultAsync(x => x.Id == id);
            
            if (groceryList == null || userId != groceryList.UserId)
            {
                return null;
            }

            groceryList.Name = groceryListDto.Name;
            groceryList.Description = groceryListDto.Description;

            await _context.SaveChangesAsync();

            return groceryList;
        }
    }
}
