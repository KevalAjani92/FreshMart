namespace Grocery_Store.DTOs
{
    public class StoreProfileDTO
    {
        public int StoreID { get; set; }
        public string StoreName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public double DeliveryRadiusKM { get; set; }
        public string Description {  get; set; }
        public string OpeningTime { get; set; }
        public string ClosingTime { get; set; }
        public string GSTNumber { get; set; }

        // Owner Info
        public int OwnerID { get; set; }
        public int UserID { get; set; }
        public string OwnerName { get; set; }
        public string OwnerEmail { get; set; }
        public string OwnerPhone { get; set; }
    }
    public class CreateStoreProfileDTO
    {
        public int OwnerID { get; set;}
        public string StoreName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Description { get; set;}
        public float DeliveryRadiusKM { get; set; }
        public TimeSpan OpeningTime { get; set; }
        public TimeSpan ClosingTime { get; set; }
        public string GSTNumber { get; set; }
    }
    public class UpdateStoreProfileDTO
    {
        public string StoreName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public float DeliveryRadiusKM { get; set; }
        public string Description { get; set; }
        public TimeSpan OpeningTime { get; set; }
        public TimeSpan ClosingTime { get; set; }
        public string GSTNumber { get; set; }
    }
}
