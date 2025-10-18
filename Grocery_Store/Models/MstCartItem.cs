using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstCartItem
{
    public int CartItemId { get; set; }

    public int CartId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; } = 1;

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public virtual MstCart Cart { get; set; } = null!;

    public virtual MstProduct Product { get; set; } = null!;
}
