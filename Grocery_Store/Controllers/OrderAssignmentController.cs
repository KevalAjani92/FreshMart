using Grocery_Store.DTOs;
using Grocery_Store.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderAssignmentController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;
        public OrderAssignmentController(GroceryStoreDbContext context)
        {
            _context = context;
        }

        [HttpPost("assign-order")]
        public async Task<IActionResult> AssignOrderToStaff([FromBody] OrderAssignmentDTO dto)
        {
            //Console.WriteLine(dto.StaffId);
            //Console.WriteLine(dto.OrderId);
            await using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // 1️⃣ Validate order
                var order = await _context.MstOrders.FindAsync(dto.OrderId);
                if (order == null || order.Status == "Cancelled" || order.Status == "Delivered")
                    return BadRequest("Invalid order state for assignment.");

                // 2️⃣ Validate staff
                var staff = await _context.MstDeliveryStaffs.FindAsync(dto.StaffId);
                if (staff == null || staff.Status == "Inactive" || staff.CurrentLoad >= staff.MaxLoad)
                    return BadRequest("Staff not available for assignment.");

                // 3️⃣ Create assignment
                var assignment = new MstDeliveryStaffAssignment
                {
                    DeliveryStaffId = dto.StaffId,
                    OrderId = dto.OrderId,
                    AssignedDate = DateTime.Now,
                    Status = "Assigned"
                };
                _context.MstDeliveryStaffAssignments.Add(assignment);

                // 4️⃣ Update order status
                //order.Status = "Packed"; // or "Assigned"
                //order.ModifiedAt = DateTime.Now;
                //_context.MstOrders.Update(order);

                // 5️⃣ Update staff load
                staff.CurrentLoad += 1;
                if (staff.CurrentLoad >= staff.MaxLoad)
                    staff.Status = "Busy";
                _context.MstDeliveryStaffs.Update(staff);

                // 6️⃣ Insert tracking history
                //var track = new MstOrderTrackingHistory
                //{
                //    OrderId = dto.OrderId,
                //    Status = "Assigned",
                //    StatusTime = DateTime.Now,
                //    Note = $"Order assigned to staff {staff.StaffId}"
                //};
                //_context.MstOrderTrackingHistories.Add(track);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok("Order successfully assigned to staff.");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                Console.WriteLine(ex.Message);
                return BadRequest(new { Message = "Failed to assign order", Error = ex.InnerException?.Message });
            }
        }

    }
}
