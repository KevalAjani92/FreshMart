namespace Grocery_Store.DTOs
{
    public class OrderDTO
    {
        public int OrderId { get; set; }

        public string OrderNumber {  get; set; }

        public int CustomerId { get; set; }

        public string CustomerName { get; set; }

        public DateTime OrderDate { get; set; }

        public string Status { get; set; }

        public string PaymentMode { get; set; } = null!;

        public decimal TotalAmount { get; set; }

        public decimal DeliveryCharge { get; set; }

        public decimal? FinalAmount { get; set; }

        public string? CancelledReason { get; set; }
    }
    public class OrderListDTO
    {
        public int OrderID {  get; set; }
        public string OrderNumber { get; set; }
        public int CustomerID { get; set; }
        public string CustomerName { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public decimal? AmountPaid { get; set; }
    }
    public class CustomerOrderListDTO
    {
        public int OrderID { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public decimal AmountPaid { get; set; }
        public DateTime? EstimatedDelivery { get; set; }
        public int Items { get; set; }
        public List<string> TopItems { get; set; }
        public string Image { get; set; }
    }
    public class PlaceOrderDTO
    {
        public int CustomerID {  get; set; }
        public string PaymentMode {  get; set; }
        public CardDetailDTO? CardDetail {  get; set; }
        public List<OrderItemDTO> OrderItems { get; set; }
    }
    public class PlaceOrderResponseDTO
    {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string PaymentStatus { get; set; } = null!;
    }
    public class CancelOrderDTO
    {
        public string? Reason {  get; set; }
    }
    public class CardDetailDTO
    {
        public string CardNumber { get; set; }
        public string ExpiryMonth { get; set; }
        public string ExpiryYear { get; set; }
        public string CardHolderName {  get; set; }
        public string CVV { get; set; }
    }

    public class OrderConfirmationDTO
    {
        public int OrderId { get; set; }
        public string? OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public string PaymentMode { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal DeliveryCharge { get; set; }
        public decimal? FinalAmount { get; set; }
        public string? TrackingNumber { get; set; }
        public DateTime? EstimatedDeliveryDate { get; set; }

        public CustomerDTO Customer { get; set; }
        public List<OrderItemResponseDTO> Items { get; set; }
    }
    public class UpdateStatusDTO
    {
        public string? Status { get; set; }
    }
}
