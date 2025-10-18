namespace Grocery_Store.DTOs
{
    public class ProductDTO
    {
        public int ProductId { get; set; }

        public string Name { get; set; }

        public string? Brand { get; set; }

        public string? Description {  get; set; }

        public bool IsFeatured {  get; set; }

        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public decimal Price { get; set; }

        public string ImageUrl { get; set; }

        public int CurrentStock { get; set; }

        public int LowStockValue { get; set; }

        public bool IsActive { get; set; }

        public int StoreOwnerId { get; set; }

        public int? SubCategoryId { get; set; }
        public string? SubCategoryName { get; set; }
        public string? Status {  get; set; }

        //public int? UnitId { get; set; }
        //public string? UnitName { get; set; }

    }
    public class CreateProductDTO
    {
        public string Name { get; set; }

        public string? Brand { get; set; }

        public string? Description { get; set; }

        public bool IsFeatured { get; set; }

        public int CategoryId { get; set; }

        public decimal Price { get; set; }

        //public string ImageUrl { get; set; }
        public IFormFile? Image {  get; set; }

        public int CurrentStock { get; set; }

        public int LowStockValue { get; set; }

        public bool IsActive { get; set; }

        public int StoreOwnerId { get; set; }

        public int? SubCategoryId { get; set; }

        //public int? UnitId { get; set; }
    }
}
