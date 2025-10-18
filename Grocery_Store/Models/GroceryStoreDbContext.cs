using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Store.Models;

public partial class GroceryStoreDbContext : DbContext
{
    public GroceryStoreDbContext()
    {
    }

    public GroceryStoreDbContext(DbContextOptions<GroceryStoreDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<MstCart> MstCarts { get; set; }

    public virtual DbSet<MstCartItem> MstCartItems { get; set; }

    public virtual DbSet<MstCategory> MstCategories { get; set; }

    public virtual DbSet<MstCustomer> MstCustomers { get; set; }

    public virtual DbSet<MstDeliveryStaff> MstDeliveryStaffs { get; set; }

    public virtual DbSet<MstDeliveryStaffAssignment> MstDeliveryStaffAssignments { get; set; }

    public virtual DbSet<MstFeedback> MstFeedbacks { get; set; }

    public virtual DbSet<MstOrder> MstOrders { get; set; }

    public virtual DbSet<MstOrderItem> MstOrderItems { get; set; }

    public DbSet<MstOrderTrackingHistory> MstOrderTrackingHistories { get; set; }

    public virtual DbSet<MstPayment> MstPayments { get; set; }

    public virtual DbSet<MstProduct> MstProducts { get; set; }

    public virtual DbSet<MstStoreOwner> MstStoreOwners { get; set; }

    public virtual DbSet<MstStoreProfile> MstStoreProfiles { get; set; }

    public virtual DbSet<MstSubCategory> MstSubCategories { get; set; }

    public virtual DbSet<MstUser> MstUsers { get; set; }
    public DbSet<MstZone> MstZones { get; set; } = null!;


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {

        }
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MstCart>(entity =>
        {
            entity.HasKey(e => e.CartId).HasName("PK__MST_Cart__51BCD7977F018A84");

            entity.ToTable("MST_Cart");

            entity.Property(e => e.CartId).HasColumnName("CartID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Customer).WithMany(p => p.MstCarts)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Cart__Custom__2645B050");
        });

        modelBuilder.Entity<MstCartItem>(entity =>
        {
            entity.HasKey(e => e.CartItemId).HasName("PK__MST_Cart__488B0B2AD1E1280E");

            entity.ToTable("MST_CartItems");

            entity.Property(e => e.CartItemId).HasColumnName("CartItemID");
            entity.Property(e => e.CartId).HasColumnName("CartID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.Quantity).HasDefaultValue(1);

            entity.HasOne(d => d.Cart).WithMany(p => p.MstCartItems)
                .HasForeignKey(d => d.CartId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_CartI__CartI__2BFE89A6");

            entity.HasOne(d => d.Product).WithMany(p => p.MstCartItems)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_CartI__Produ__2CF2ADDF");
        });

        modelBuilder.Entity<MstCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__MST_Cate__19093A2BC3BBF257");

            entity.ToTable("MST_Categories");

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description).HasDefaultValue("Default Discription");
            entity.Property(e => e.IconName).HasDefaultValue("N/A").HasColumnName("iconName");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<MstCustomer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__MST_Cust__A4AE64B8D488810F");

            entity.ToTable("MST_Customer");

            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.Address).HasMaxLength(300);
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Pincode).HasMaxLength(10);
            entity.Property(e => e.State).HasMaxLength(100);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.MstCustomers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Custo__UserI__5165187F");
        });

        modelBuilder.Entity<MstDeliveryStaff>(entity =>
        {
            entity.HasKey(e => e.StaffId).HasName("PK__MST_Deli__96D4AAF74B5F6D15");

            entity.ToTable("MST_DeliveryStaff");

            entity.Property(e => e.StaffId).HasColumnName("StaffID");
            entity.Property(e => e.ZoneId).HasColumnName("ZoneID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TotalDeliveriesCompleted)
                  .HasDefaultValue(0);

            entity.Property(e => e.TotalEarnings)
                  .HasColumnType("decimal(10,2)")
                  .HasDefaultValue(0);
            entity.Property(e => e.CurrentLoad).HasDefaultValue(0);
            entity.Property(e => e.MaxLoad).HasDefaultValue(5);

            entity.Property(e => e.EmploymentStatus)
                  .HasMaxLength(20)
                  .HasDefaultValue("Active");
            entity.Property(e => e.LicenseNumber).HasMaxLength(50);
            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("Available");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.VehicleNumber).HasMaxLength(50);
            entity.Property(e => e.VehicleType).HasMaxLength(50);

            entity.HasOne(d => d.User).WithMany(p => p.MstDeliveryStaffs)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Deliv__UserI__5CD6CB2B");
            entity.HasOne(d => d.Zone)
                  .WithMany()
                  .HasForeignKey(d => d.ZoneId)
                  .OnDelete(DeleteBehavior.SetNull)
                  .HasConstraintName("FK_MST_DeliveryStaff_Zone");
        });

        modelBuilder.Entity<MstDeliveryStaffAssignment>(entity =>
        {
            entity.HasKey(e => e.AssignmentId).HasName("PK__MST_Deli__32499E5736B51D8F");

            entity.ToTable("MST_DeliveryStaffAssignments");

            entity.Property(e => e.AssignmentId).HasColumnName("AssignmentID");
            entity.Property(e => e.AssignedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DeliveryStaffId).HasColumnName("DeliveryStaffID");
            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Note).HasMaxLength(200);
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValue("Assigned");

            entity.HasOne(d => d.DeliveryStaff).WithMany(p => p.MstDeliveryStaffAssignments)
                .HasForeignKey(d => d.DeliveryStaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Deliv__Deliv__339FAB6E");

            entity.HasOne(d => d.Order).WithMany(p => p.MstDeliveryStaffAssignments)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Deliv__Order__3493CFA7");
        });

        modelBuilder.Entity<MstFeedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__MST_Feed__6A4BEDF6C421600C");

            entity.ToTable("MST_Feedback");

            entity.Property(e => e.FeedbackId).HasColumnName("FeedbackID");
            entity.Property(e => e.Comment).HasMaxLength(300);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FeedbackTargetType).HasMaxLength(50);
            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Order).WithMany(p => p.MstFeedbacks)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__MST_Feedb__Order__208CD6FA");

            entity.HasOne(d => d.Product).WithMany(p => p.MstFeedbacks)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__MST_Feedb__Produ__2180FB33");

            entity.HasOne(d => d.User).WithMany(p => p.MstFeedbacks)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Feedb__UserI__1F98B2C1");
        });

        modelBuilder.Entity<MstOrder>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__MST_Orde__C3905BAFE0854279");

            entity.ToTable("MST_Orders");

            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.CancelledReason).HasMaxLength(300);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.DeliveryCharge).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.FinalAmount)
                .HasComputedColumnSql("([TotalAmount]+[DeliveryCharge])", true)
                .HasColumnType("decimal(11, 2)");

            entity.Property(e => e.TrackingNumber)
                .HasMaxLength(20)
                .IsUnicode(false); // optional if you want only alphanumeric
            entity.HasIndex(e => e.TrackingNumber)
                .IsUnique()
                .HasFilter("[TrackingNumber] IS NOT NULL");

            entity.Property(e => e.EstimatedDeliveryDate)
                .HasColumnType("datetime");

            entity.Property(e => e.DeliveredDate)
                .HasColumnType("datetime");

            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.OrderDate).HasColumnType("datetime");
            entity.Property(e => e.OrderNumber).HasMaxLength(20);
            entity.Property(e => e.PaymentMode).HasMaxLength(50);
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValue("Pending");
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Customer).WithMany(p => p.MstOrders)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Order__Custo__6E01572D");
        });
        modelBuilder.Entity<MstOrderTrackingHistory>(entity =>
        {
            entity.HasKey(e => e.TrackingId).HasName("PK__MST_Orde__3C19EDD12A0A0EDB");

            entity.ToTable("MST_OrderTrackingHistory");

            entity.Property(e => e.TrackingId).HasColumnName("TrackingID");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");

            entity.Property(e => e.Status)
                .HasMaxLength(50);

            entity.Property(e => e.StatusTime)
                .HasColumnType("datetime")
                .HasDefaultValueSql("(getdate())");

            entity.Property(e => e.Location)
                .HasMaxLength(100);

            entity.Property(e => e.Note)
                .HasMaxLength(255);

            entity.HasOne(d => d.Order)
                .WithMany(p => p.MstOrderTrackingHistories)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__MST_Order__Order__0A688BB1");

        });


        modelBuilder.Entity<MstOrderItem>(entity =>
        {
            entity.HasKey(e => e.OrderItemId).HasName("PK__MST_Orde__57ED06A1C80AE78B");

            entity.ToTable("MST_OrderItems");

            entity.Property(e => e.OrderItemId).HasColumnName("OrderItemID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.TotalPrice)
                .HasComputedColumnSql("([Quantity]*[UnitPrice])", true)
                .HasColumnType("decimal(21, 2)");
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Order).WithMany(p => p.MstOrderItems)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Order__Order__72C60C4A");

            entity.HasOne(d => d.Product).WithMany(p => p.MstOrderItems)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Order__Produ__73BA3083");
        });

        modelBuilder.Entity<MstPayment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__MST_Paym__9B556A589D4588C7");

            entity.ToTable("MST_Payment");

            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.AmountPaid).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.PaymentDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.PaymentMode).HasMaxLength(50);
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.TransactionId)
                .HasMaxLength(100)
                .HasColumnName("TransactionID");

            entity.HasOne(d => d.Order).WithMany(p => p.MstPayments)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Payme__Order__17036CC0");
        });

        modelBuilder.Entity<MstProduct>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__MST_Prod__B40CC6EDC8805326");

            entity.ToTable("MST_Products");

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.Brand).HasMaxLength(100);
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description).HasDefaultValue("Default Discription");
            entity.Property(e => e.ImageUrl).HasColumnName("ImageURL");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsFeatured).HasDefaultValue(false).HasColumnName("isFeatured");
            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.StoreOwnerId).HasColumnName("StoreOwnerID");
            entity.Property(e => e.SubCategoryId).HasColumnName("SubCategoryID");
            //entity.Property(e => e.UnitId).HasColumnName("UnitID");

            entity.HasOne(d => d.Category).WithMany(p => p.MstProducts)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Produ__Categ__6754599E");

            entity.HasOne(d => d.StoreOwner).WithMany(p => p.MstProducts)
                .HasForeignKey(d => d.StoreOwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Produ__Store__68487DD7");

            entity.HasOne(d => d.SubCategory).WithMany(p => p.MstProducts)
                .HasForeignKey(d => d.SubCategoryId)
                .HasConstraintName("FK__MST_Produ__SubCa__46B27FE2");

            //entity.HasOne(d => d.Unit).WithMany(p => p.MstProducts)
            //    .HasForeignKey(d => d.UnitId)
            //    .HasConstraintName("FK__MST_Produ__UnitI__47A6A41B");
        });


        modelBuilder.Entity<MstStoreOwner>(entity =>
        {
            entity.HasKey(e => e.StoreOwnerId).HasName("PK__MST_Stor__07156658F5F774F5");

            entity.ToTable("MST_StoreOwner");

            entity.Property(e => e.StoreOwnerId).HasColumnName("StoreOwnerID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.MstStoreOwners)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Store__UserI__5629CD9C");
        });

        modelBuilder.Entity<MstStoreProfile>(entity =>
        {
            entity.HasKey(e => e.StoreId).HasName("PK__MST_Stor__3B82F0E1DB156672");

            entity.ToTable("MST_StoreProfile");

            entity.HasIndex(e => e.Gstnumber, "UQ_StoreProfile_GST").IsUnique();

            entity.Property(e => e.StoreId).HasColumnName("StoreID");
            entity.Property(e => e.Address).HasMaxLength(300);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DeliveryRadiusKm).HasColumnName("DeliveryRadiusKM");
            entity.Property(e => e.Description).HasColumnName("Description").HasDefaultValue("Default Description");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Gstnumber)
                .HasMaxLength(50)
                .HasColumnName("GSTNumber");
            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.OwnerId).HasColumnName("OwnerID");
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.StoreName).HasMaxLength(100);

            entity.HasOne(d => d.Owner).WithMany(p => p.MstStoreProfiles)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_Store__Owner__787EE5A0");
        });

        modelBuilder.Entity<MstSubCategory>(entity =>
        {
            entity.HasKey(e => e.SubCategoryId).HasName("PK__MST_SubC__26BE5BF9C4132F95");

            entity.ToTable("MST_SubCategory");

            entity.Property(e => e.SubCategoryId).HasColumnName("SubCategoryID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.SubCategoryName).HasMaxLength(100);

            entity.HasOne(d => d.Category).WithMany(p => p.MstSubCategories)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MST_SubCa__Categ__3F115E1A");
        });

        modelBuilder.Entity<MstUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__MST_User__1788CCAC7EA0ABEE");

            entity.ToTable("MST_User");

            entity.HasIndex(e => e.Email, "UQ_User_Email").IsUnique();

            entity.HasIndex(e => e.Phone, "UQ_User_Phone").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.Phone).HasMaxLength(10);
            entity.Property(e => e.ProfileImageUrl).HasColumnName("ProfileImageUrl");
            entity.Property(e => e.Role)
                .HasMaxLength(100)
                .HasDefaultValue("Customer");
            entity.Property(e => e.UserName).HasMaxLength(100);
        });
        modelBuilder.Entity<MstZone>(entity =>
        {
            entity.HasKey(e => e.ZoneId)
                  .HasName("PK__MST_Zone__60166795CEEF0D88");

            entity.ToTable("MST_Zone");

            entity.Property(e => e.ZoneId)
                  .HasColumnName("ZoneID");

            entity.Property(e => e.ZoneName)
                  .IsRequired()
                  .HasMaxLength(100);

            entity.Property(e => e.Description)
                  .HasMaxLength(255);

            entity.Property(e => e.PincodeStart);

            entity.Property(e => e.PincodeEnd);

            entity.Property(e => e.City)
                  .IsRequired()
                  .HasMaxLength(100);

            entity.Property(e => e.State)
                  .IsRequired()
                  .HasMaxLength(100);

            entity.Property(e => e.Country)
                  .IsRequired()
                  .HasMaxLength(100)
                  .HasDefaultValue("India");

            entity.Property(e => e.IsActive)
                  .HasDefaultValue(true);

            entity.Property(e => e.CreatedAt)
                  .HasColumnType("datetime")
                  .HasDefaultValueSql("(getdate())");

            entity.Property(e => e.ModifiedAt)
                  .HasColumnType("datetime")
                  .HasDefaultValueSql("(getdate())");
        });



        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
