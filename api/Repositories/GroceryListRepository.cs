using api.Data;
using api.Dtos.Grocery;
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

        public async Task<GroceryList> CreateAsync(
            string userId, CreateGroceryListDto groceryListDto
        )
        {
            // Create grocery object
            var groceryList = groceryListDto.ToGroceryListFromCreateDto();
            groceryList.UserId = userId;

            // Make queries
            await _context.GroceryLists.AddAsync(groceryList);
            await _context.SaveChangesAsync();

            return groceryList;
        }

        public async Task<GroceryList?> DeleteAsync(string? userId, Guid id)
        {
            if (userId == null) return null;

            var groceryList = await _context.GroceryLists.FindAsync(id);
            if (groceryList == null) return null;

            _context.GroceryLists.Remove(groceryList);
            await _context.SaveChangesAsync();
            return groceryList; 
        }

        public async Task<IEnumerable<GroceryList>?> GetAllAsync(string? userId)
        {
            if (userId == null) return null;

            var lists = await _context.GroceryLists
                .Where(x => x.UserId == userId)
                .Include(x => x.Groceries)
                .ToListAsync();

            return lists;
        }

        public async Task<GroceryList?> GetByIdAsync(Guid id, string userId)
        {
            // Find grocery list
            var groceryList = await _context.GroceryLists
                .Include(x => x.Groceries)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (groceryList == null) return null;   // Return early if it doesn't exist

            // Check if user is owner of the grocery list
            if (groceryList.UserId != userId)
            {
                // Check if user is a member of the grocery list
                var groceryListMember = await _context.GroceryListMembers
                    .FirstOrDefaultAsync(
                    x => x.UserId == userId && x.GroceryListId == groceryList.Id
                );

                // Make user a member of the grocery list
                if (groceryListMember == null)
                {
                    // Create new member
                    groceryListMember = new GroceryListMember
                    {
                        UserId = userId,
                        GroceryListId = id,
                    };

                    _context.Add(groceryListMember);
                    await _context.SaveChangesAsync();
                }
            }

            return groceryList; // Return grocery list
        }

        public async Task<GroceryList?> UpdateAllGroceriesAsync(
            string userId, Guid id, IEnumerable<GroceryDto>? groceries
        )
        {
            var groceryList = await this.GetByIdAsync(id, userId);
            if (groceryList == null) return null;

            if (groceries != null)
            {
                foreach (var grocery in groceries)
                {
                    var prevGrocery = await _context.Groceries.FindAsync(grocery.Id);
                    if (prevGrocery == null) return null;

                    prevGrocery.Monday = grocery.Monday;
                    prevGrocery.Tuesday = grocery.Tuesday;
                    prevGrocery.Wednesday = grocery.Wednesday;
                    prevGrocery.Thursday = grocery.Thursday;
                    prevGrocery.Friday = grocery.Friday;
                    prevGrocery.Saturday = grocery.Saturday;
                    prevGrocery.Sunday = grocery.Sunday;
                }

                await _context.SaveChangesAsync();
            }
        
            return groceryList;
        }

        public async Task<GroceryList?> UpdateAsync(
            Guid id, string userId, UpdateGroceryListDto groceryListDto
        )
        {
            var groceryList = await _context.GroceryLists
                .Include(x => x.Groceries)
                .FirstOrDefaultAsync(x => x.Id == id);
            
            if (groceryList == null || userId != groceryList.UserId) return null;

            groceryList.Name = groceryListDto.Name;
            groceryList.Description = groceryListDto.Description;

            await _context.SaveChangesAsync();

            return groceryList;
        }
    }
}
