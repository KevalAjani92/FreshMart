using Grocery_Store.Models;

namespace Grocery_Store.DTOs
{
    public class StoreOwnerDTO
    {
        public int StoreOwnerID {  get; set; }
        public int UserID {  get; set; }
        public string UserName { get; set; }
        public string Email {  get; set; }
        public string Phone {  get; set; }
        public string? ProfileImageUrl {  get; set; }
        public DateTime? JoinedAt { get; set; }

    }
    public class UpdateStoreOwnerDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public IFormFile? Image {  get; set; }
    }
}
