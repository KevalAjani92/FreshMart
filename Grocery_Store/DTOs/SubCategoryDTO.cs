namespace Grocery_Store.DTOs
{
    public class SubCategoryDTO
    {
        public int SubCategoryID {  get; set; }
        public string SubCategoryName { get; set; }
        public int CategoryID {  get; set; }
        public string CategoryName { get; set; }
    }
    public class CreateSubCategoryDTO
    {
        public string SubCategoryName { get; set; }
        public int CategoryID { get; set; }
    }
    public class SubCategoryDropDownDTO
    {
        public int SubCategoryID { get; set; }
        public string SubCategoryName { get; set; }
        public int CategoryID { get; set; }
    }
}
