using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstDeliveryStaff
{
    public int StaffId { get; set; }

    public int UserId { get; set; }

    public int? ZoneId { get; set; }

    public string? VehicleType { get; set; }

    public string? VehicleNumber { get; set; }

    public string? LicenseNumber { get; set; }

    public double Rating { get; set; }

    public int CurrentLoad {  get; set; } = 0;

    public int MaxLoad { get; set; } = 5;

    public string Status { get; set; } = "Available";

    public int TotalDeliveriesCompleted { get; set; } = 0;

    public decimal TotalEarnings { get; set; } = 0;

    public string EmploymentStatus { get; set; } = "Active";

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public virtual ICollection<MstDeliveryStaffAssignment> MstDeliveryStaffAssignments { get; set; } = new List<MstDeliveryStaffAssignment>();

    public virtual MstUser User { get; set; } = null!;
    public virtual MstZone? Zone { get; set; }   // Navigation to Zone

}
