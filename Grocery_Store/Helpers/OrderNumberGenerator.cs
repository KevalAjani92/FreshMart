namespace Grocery_Store.Helpers
{
    public static class OrderNumberGenerator
    {
        private static readonly char[] chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".ToCharArray();
        private static readonly Random random = new();

        public static string GenerateOrderNumber(int orderId)
        {
            // Add a salt to avoid predictability
            int saltedId = orderId + 982451; // 982451 is a large prime number for extra security

            // Convert to Base36
            string basePart = EncodeBase36(saltedId);

            // Add random 3-letter suffix for uniqueness & padding
            string randomPart = new string(Enumerable.Repeat(chars, 3)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            return $"ORD-{basePart}{randomPart}";
        }

        private static string EncodeBase36(int value)
        {
            const string baseChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string result = "";
            while (value > 0)
            {
                result = baseChars[value % 36] + result;
                value /= 36;
            }
            return result.PadLeft(7, '0'); // Ensure fixed minimum length
        }
    }

}
