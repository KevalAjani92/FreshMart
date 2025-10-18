using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstOrderItem
{
    public int OrderItemId { get; set; }

    public int OrderId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal? TotalPrice { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public virtual MstOrder Order { get; set; } = null!;

    public virtual MstProduct Product { get; set; } = null!;
}
