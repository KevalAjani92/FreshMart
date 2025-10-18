using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstDeliveryStaffAssignment
{
    public int AssignmentId { get; set; }

    public int DeliveryStaffId { get; set; }

    public int OrderId { get; set; }

    public DateTime? AssignedDate { get; set; }

    public string Status { get; set; } = null!;

    public string? Note { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public virtual MstDeliveryStaff DeliveryStaff { get; set; } = null!;

    public virtual MstOrder Order { get; set; } = null!;
}
