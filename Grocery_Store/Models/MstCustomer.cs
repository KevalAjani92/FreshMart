using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstCustomer
{
    public int CustomerId { get; set; }

    public int UserId { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? Pincode { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public virtual ICollection<MstCart> MstCarts { get; set; } = new List<MstCart>();

    public virtual ICollection<MstOrder> MstOrders { get; set; } = new List<MstOrder>();

    public virtual MstUser User { get; set; } = null!;
}
