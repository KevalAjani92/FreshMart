using System;
using System.Collections.Generic;

namespace Grocery_Store.Models;

public partial class MstUser
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? ProfileImageUrl {  get; set; }

    public string Role { get; set; } = "Customer";

    public bool IsActive { get; set; } = true;

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public virtual ICollection<MstCustomer> MstCustomers { get; set; } = new List<MstCustomer>();

    public virtual ICollection<MstDeliveryStaff> MstDeliveryStaffs { get; set; } = new List<MstDeliveryStaff>();

    public virtual ICollection<MstFeedback> MstFeedbacks { get; set; } = new List<MstFeedback>();

    public virtual ICollection<MstStoreOwner> MstStoreOwners { get; set; } = new List<MstStoreOwner>();
}
