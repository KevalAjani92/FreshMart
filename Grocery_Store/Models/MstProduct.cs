using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstProduct
{
    public int ProductId { get; set; }

    public string Name { get; set; } = null!;

    public string? Brand { get; set; }

    public int CategoryId { get; set; }

    public decimal Price { get; set; }

    public string? Description { get; set; } = "Default Description";

    public bool IsFeatured {  get; set; } = false;

    public string ImageUrl { get; set; } = null!;

    public int CurrentStock { get; set; }

    public int LowStockValue { get; set; }

    public bool IsActive { get; set; }

    public int StoreOwnerId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public int? SubCategoryId { get; set; }

    //public int? UnitId { get; set; }

    public virtual MstCategory Category { get; set; } = null!;

    public virtual ICollection<MstCartItem> MstCartItems { get; set; } = new List<MstCartItem>();

    public virtual ICollection<MstFeedback> MstFeedbacks { get; set; } = new List<MstFeedback>();

    public virtual ICollection<MstOrderItem> MstOrderItems { get; set; } = new List<MstOrderItem>();

    public virtual MstStoreOwner StoreOwner { get; set; } = null!;

    public virtual MstSubCategory? SubCategory { get; set; }

    //public virtual MstQuantityUnit? Unit { get; set; }
}
