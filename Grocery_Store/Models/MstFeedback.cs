using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstFeedback
{
    public int FeedbackId { get; set; }

    public int UserId { get; set; }

    public int? OrderId { get; set; }

    public int? ProductId { get; set; }

    public int Rating { get; set; }

    public string? Comment { get; set; }

    public string FeedbackTargetType { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public virtual MstOrder? Order { get; set; }

    public virtual MstProduct? Product { get; set; }

    public virtual MstUser User { get; set; } = null!;
}
