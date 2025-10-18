namespace Grocery_Store.Models
{
    public partial class MstOrderTrackingHistory
    {
        public int TrackingId { get; set; }
        public int OrderId { get; set; }
        public string Status { get; set; }
        public DateTime StatusTime { get; set; }
        public string? Location { get; set; }
        public string? Note { get; set; }

        // Navigation property to Order
        public virtual MstOrder Order { get; set; }
    }

}
