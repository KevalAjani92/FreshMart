namespace Grocery_Store.DTOs
{
    public class CategoryDTO
    {
        public int CategoryID {  get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? IconName {  get; set; }
        public bool IsActive {  get; set; }
        public int ProductCount {  get; set; }
        public int SubCategoryCount {  get; set; }
    }
    public class CreateCategoryDTO
    {
        public string Name { get; set;}
        public string? Description { get; set; }
        public string? IconName { get; set; }
    }
    public class UpdateCategoryDTO
    {
        public string Name { get; set;}
        public string? Description { get; set; }
        public string? IconName { get; set; }
        public bool IsActive { get; set; }
    }
    public class CategoryDropDownDTO
    {
        public int CategoryID { get; set;}
        public string Name { get; set;}
    }
}
