namespace Grocery_Store.DTOs
{
    public class InvoiceDTO
    {
        public int OrderId {  get; set; }
        public string OrderNumber {  get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime OrderDate { get; set; }

        public string CustomerName {  get; set; }
        public string PhoneNumber {  get; set; }
        public string DeliveryAddress {  get; set; }

        public string PaymentStatus { get; set; } = null!;  // e.g., Paid, Pending
        public string PaymentMode { get; set; } = null!;    // e.g., UPI, COD
        public string DeliveryStatus { get; set; } = null!; // e.g., Delivered, Pending

        public List<OrderItemResponseDTO> Items { get; set; } = new();

        public decimal TotalAmount { get; set; }
        public decimal DeliveryCharge { get; set; }
        public decimal? FinalAmount { get; set; }

    }
}
