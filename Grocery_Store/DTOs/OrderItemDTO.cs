namespace Grocery_Store.DTOs
{
    public class OrderItemDTO
    {
        public int ProductID { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

    public class OrderItemResponseDTO
    {
        public int ProductID { get; set; }
        public string Name { get; set; }
        public string? Category {  get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? ImageUrl { get; set; }
    }
}
