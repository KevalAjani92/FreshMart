using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstStoreProfile
{
    public int StoreId { get; set; }

    public string StoreName { get; set; } = null!;

    public int OwnerId { get; set; }

    public string Address { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Description { get; set; } = null!;

    public double DeliveryRadiusKm { get; set; }

    public TimeSpan OpeningTime { get; set; }

    public TimeSpan ClosingTime { get; set; }

    public string Gstnumber { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public virtual MstStoreOwner Owner { get; set; } = null!;
}
