using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstStoreOwner
{
    public int StoreOwnerId { get; set; }

    public int UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public virtual ICollection<MstProduct> MstProducts { get; set; } = new List<MstProduct>();

    public virtual ICollection<MstStoreProfile> MstStoreProfiles { get; set; } = new List<MstStoreProfile>();

    public virtual MstUser User { get; set; } = null!;
}
