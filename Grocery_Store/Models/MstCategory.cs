using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstCategory
{
    public int CategoryId { get; set; }

    public string Name { get; set; } = null!;

    public bool IsActive { get; set; } = true;

    public string? Description { get; set; } = "Default Description";

    public string? IconName { get; set; } = "N/A";

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public virtual ICollection<MstProduct> MstProducts { get; set; } = new List<MstProduct>();

    public virtual ICollection<MstSubCategory> MstSubCategories { get; set; } = new List<MstSubCategory>();
}
