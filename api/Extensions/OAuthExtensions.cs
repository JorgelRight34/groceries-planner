namespace api.Extensions
{
    public static class OAuthExtensions
    {
        public static string ToUsernameFromGoogleToken(this string googleToken)
        {
            return String.Join("", googleToken.Split(" "));
        }
    }
}
