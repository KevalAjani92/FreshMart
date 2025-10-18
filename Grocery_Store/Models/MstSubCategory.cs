using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstSubCategory
{
    public int SubCategoryId { get; set; }

    public string SubCategoryName { get; set; } = null!;

    public int CategoryId { get; set; }

    public virtual MstCategory Category { get; set; } = null!;

    public virtual ICollection<MstProduct> MstProducts { get; set; } = new List<MstProduct>();
}
