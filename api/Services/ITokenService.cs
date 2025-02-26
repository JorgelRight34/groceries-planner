using api.Models;

namespace api.Services
{
    public interface ITokenService
    {
        string CreateToken(AppUser appUser);
    }
}
