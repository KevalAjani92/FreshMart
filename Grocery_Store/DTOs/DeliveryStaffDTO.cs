namespace Grocery_Store.DTOs
{
    public class DeliveryStaffDTO
    {
        public int StaffID { get; set; }
        public int UserID { get; set; }
        public string? UserName { get; set; }
        public string? Email {  get; set; }
        public string? Phone {  get; set; }
        public string? ProfileImage {  get; set; }
        public string Status {  get; set; }
        public string EmploymentStatus { get; set; } = "Active";
        public int TotalDeliveriesCompleted { get; set; }
        public decimal TotalEarnings { get; set; }
        public int ZoneId {  get; set; }
        public string? ZoneName { get; set; }
        public int OrdersToday { get; set; }
        public double Rating { get; set; }
        public DateTime? JoinedDate { get; set; }
    }
    public class CreateDeliveryStaffDTO
    {
        public string FullName {  get; set; }
        public string Email {  get; set; }
        public string Phone { get; set; }
        public int ZoneId {  get; set; }
    }

    public class UpdateDeliveryStaffDTO
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string? VehicleType { get; set; }
        public string? VehicleNumber { get; set; }
        public string? LicenseNumber { get; set; }
    }
}
