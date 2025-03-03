using api.Data;
using api.Dtos.Grocery;
using api.Models;
using api.Repositories;
using Microsoft.AspNetCore.Identity;

namespace api.Services
{
    public class GroceryListService : IGroceryListService
    {
        private readonly ApplicationDbContext _context;
        private readonly IGroceryListRepository _groceryListRepository;
        private readonly UserManager<AppUser> _userManager;
        public GroceryListService(ApplicationDbContext context, UserManager<AppUser> userManager, IGroceryListRepository groceryListRepository)
        {
            _context = context;
            _groceryListRepository = groceryListRepository;
            _userManager = userManager;
        }
        public async Task<GroceryList?> AddMemberAsync(string userId, Guid groceryListId)
        {
            var groceryList = await _groceryListRepository.GetByIdAsync(groceryListId);
            if (groceryList == null) return null;

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return null;

            var groceryListMember = new GroceryListMember
            {
                UserId = userId,
                GroceryListId = groceryListId,
            };

            _context.Add(groceryListMember);
            await _context.SaveChangesAsync();

            return groceryList;
        }
    }
}
