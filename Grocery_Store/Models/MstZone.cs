namespace Grocery_Store.Models
{
    public class MstZone
    {
        public int ZoneId { get; set; }
        public string ZoneName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int? PincodeStart { get; set; }
        public int? PincodeEnd { get; set; }
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string Country { get; set; } = "India";
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime ModifiedAt { get; set; } = DateTime.Now;
    }
}
