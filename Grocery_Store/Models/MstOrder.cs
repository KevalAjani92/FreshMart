using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstOrder
{
    public int OrderId { get; set; }

    public int CustomerId { get; set; }

    public DateTime OrderDate { get; set; }

    public string? OrderNumber {  get; set; }

    public string Status { get; set; } = "Pending";

    public string PaymentMode { get; set; } = null!;

    public decimal TotalAmount { get; set; }

    public decimal DeliveryCharge { get; set; }

    public decimal? FinalAmount { get; set; }

    public string? CancelledReason { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    // ✅ New Tracking Fields
    public string? TrackingNumber { get; set; }
    public DateTime? EstimatedDeliveryDate { get; set; }
    public DateTime? DeliveredDate { get; set; }

    public virtual MstCustomer Customer { get; set; } = null!;

    public virtual ICollection<MstDeliveryStaffAssignment> MstDeliveryStaffAssignments { get; set; } = new List<MstDeliveryStaffAssignment>();

    public virtual ICollection<MstFeedback> MstFeedbacks { get; set; } = new List<MstFeedback>();

    public virtual ICollection<MstOrderItem> MstOrderItems { get; set; } = new List<MstOrderItem>();

    public virtual ICollection<MstPayment> MstPayments { get; set; } = new List<MstPayment>();
    public virtual ICollection<MstOrderTrackingHistory> MstOrderTrackingHistories { get; set; }
        = new List<MstOrderTrackingHistory>();
}
