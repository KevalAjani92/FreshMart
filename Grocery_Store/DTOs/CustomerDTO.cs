namespace Grocery_Store.DTOs
{
    public class CustomerDTO
    {
        public int CustomerID {  get; set; }
        public int UserID {  get; set; }
        public string UserName {  get; set; }
        public string Email {  get; set; }
        public string Phone { get; set; }
        public string? Address {  get; set; }
        public string? City { get; set; }
        public string? State {  get; set; }
        public string? PinCode {  get; set; }
    }
    public class CreateCustomerDTO
    {
        public int UserID { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PinCode { get; set; }
    }
    public class UpdateCustomerDTO
    {
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PinCode { get; set; }
    }
    public class CustomerProfileDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string? profileImageUrl { get; set; }
        public string MemberSince { get; set; }
        public int TotalOrders { get; set; }
        public decimal TotalSpent { get; set; }
    }
    
}
