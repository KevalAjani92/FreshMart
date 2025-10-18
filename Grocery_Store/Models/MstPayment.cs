using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstPayment
{
    public int PaymentId { get; set; }

    public int OrderId { get; set; }

    public decimal AmountPaid { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? PaymentDate { get; set; }

    public string? TransactionId { get; set; }

    public string PaymentMode { get; set; } = null!;

    public virtual MstOrder Order { get; set; } = null!;
}
