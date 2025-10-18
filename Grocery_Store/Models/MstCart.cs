using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstCart
{
    public int CartId { get; set; }

    public int CustomerId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public virtual MstCustomer Customer { get; set; } = null!;

    public virtual ICollection<MstCartItem> MstCartItems { get; set; } = new List<MstCartItem>();
}
