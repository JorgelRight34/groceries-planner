using api.Data;
using api.Dtos.GroceryList;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class GroceryListRepository : IGroceryListRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        public GroceryListRepository(
            ApplicationDbContext context, 
            UserManager<AppUser> userManager
        )
        {
            _context = context;
            _userManager = userManager;
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

        public async Task<GroceryList?> DeleteAsync(string userId, int id)
        {
            var groceryList = await _context.GroceryLists.FindAsync(id);
            if (groceryList == null || groceryList.UserId != userId)
            {
                return null;
            }

            _context.GroceryLists.Remove(groceryList);
            await _context.SaveChangesAsync();
            return groceryList; 
        }

        public async Task<IEnumerable<GroceryList>> GetAllAsync(string userId)
        {
            var lists = await _context.GroceryLists
                .Where(x => x.UserId == userId)
                .Include(x => x.Groceries)
                .ToListAsync();

            return lists;
        }
    }
}
