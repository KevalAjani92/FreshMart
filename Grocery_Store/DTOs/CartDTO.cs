namespace Grocery_Store.DTOs
{
    public class CartDTO
    {
        public int CartID {  get; set; }
        public int CustomerID {  get; set; }
        public List<CartItemsDTO> Items { get; set; }
    }
    public class AddCartItemDTO
    {
        public int CustomerID {  get; set; }
        public int ProductID {  get; set; }
        public int Quantity {  get; set; }
    }
    public class CartItemsDTO
    {
        public int CartItemsID {  get; set; }
        public int ProductID { get; set; }
        public int Quantity { get; set; }
        public string Name {  get; set; }
        public string Brand {  get; set; }
        public string ImageUrl { get; set; }
        public decimal Price {  get; set; }
    }
    public class UpdateCartItemDTO
    {
        public int CartItemID { get; set; }
        public int Quantity { get; set; }
    }

}
