using Grocery_Store.DTOs;
using Grocery_Store.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryStaffController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;

        public DeliveryStaffController(GroceryStoreDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetStaff(
        string? search = null,
        string? status = null,
        string? zone = null,
        string? sort = null)
        {
            var today = DateTime.Today;

            var query = _context.MstDeliveryStaffs
                .Include(s => s.User)
                .Include(s => s.MstDeliveryStaffAssignments)
                .Include(s => s.Zone)
                .AsQueryable();

            // 🔍 Search
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s =>
                    s.User.UserName.Contains(search) ||
                    s.User.Email.Contains(search) ||
                    s.User.Phone.Contains(search));
            }

            // 📌 Filter by status
            if (!string.IsNullOrEmpty(status) && status != "all")
            {
                query = query.Where(s => s.Status == status);
            }

            // 📌 Filter by zone
            if (!string.IsNullOrEmpty(zone) && zone != "all")
            {
                query = query.Where(s => s.Zone.ZoneName == zone);
            }

            // 📌 Sorting
            query = sort switch
            {
                "HighestRating" => query.OrderByDescending(s => s.Rating),
                "MostDeliveries" => query.OrderByDescending(s => s.MstDeliveryStaffAssignments.Count),
                "MostActiveToday" => query.OrderByDescending(s =>
                    s.MstDeliveryStaffAssignments
                        .Count(a => a.AssignedDate.HasValue &&
                                    EF.Functions.DateDiffDay(a.AssignedDate.Value, today) == 0)),
                _ => query.OrderBy(s => s.StaffId)
            };

            var result = await query.Select(s => new DeliveryStaffDTO
            {
                StaffID = s.StaffId,
                            UserID = s.UserId,
                UserName = s.User.UserName,
                Email = s.User.Email,
                Phone = s.User.Phone,
                ProfileImage = s.User.ProfileImageUrl ?? "https://localhost:7188/uploads/dummy_profileImage.jpg",
                Status = s.Status.ToLower(),
                EmploymentStatus = s.EmploymentStatus,
                TotalDeliveriesCompleted = s.TotalDeliveriesCompleted,
                TotalEarnings = s.TotalEarnings,
                ZoneName = s.Zone.ZoneName,
                ZoneId = (int)s.ZoneId,
                OrdersToday = s.MstDeliveryStaffAssignments
                                .Count(a => a.AssignedDate.HasValue &&
                                            EF.Functions.DateDiffDay(a.AssignedDate.Value, today) == 0),
                Rating = s.Rating,
                JoinedDate = s.CreatedAt
            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByID(int id)
        {
            var staff = await _context.MstDeliveryStaffs
                .Where(s => s.StaffId == id)
                .Include(s => s.User)
                .Select(s => new 
                {
                    id = s.StaffId,
                    UserID = s.UserId,
                    name = s.User.UserName,
                    Email = s.User.Email,
                    Phone = s.User.Phone,
                    isOnline = s.Status.ToLower() == "available",
                    avatar = s.User.ProfileImageUrl ?? "https://localhost:7188/uploads/dummy_profileImage.jpg",
                    VehicleType = s.VehicleType,
                    VehicleNumber = s.VehicleNumber,
                    LicenseNumber = s.LicenseNumber,
                    joiningDate = s.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (staff == null)
            {
                return NotFound("Staff Not Found");
            }
            return Ok(staff);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDeliveryStaffDTO dto)
        {
            if (await _context.MstUsers.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }
            var defaultPassword = GenerateRandomPassword();

            var user = new MstUser
            {
                UserName = dto.FullName,
                Email = dto.Email,
                Password = defaultPassword,
                Phone = dto.Phone,
                Role = "DeliveryStaff"
            };
            _context.MstUsers.Add(user);
            await _context.SaveChangesAsync();

            var staff = new MstDeliveryStaff
            {
                UserId = user.UserId,
                ZoneId = dto.ZoneId,
            };
            _context.MstDeliveryStaffs .Add(staff);
            await _context.SaveChangesAsync();
            return Ok("Staff added Successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateDeliveryStaffDTO dto)
        {
            var staff = await _context.MstDeliveryStaffs
                .Include(s => s.User) // 👈 load User relation
                .FirstOrDefaultAsync(s => s.StaffId == id);
            if (staff == null)
            {
                return NotFound();
            }
            staff.User.UserName = dto.FullName;
            staff.User.Email = dto.Email;
            staff.User.Phone = dto.Phone;
            staff.VehicleType = dto.VehicleType;
            staff.VehicleNumber = dto.VehicleNumber;
            staff.LicenseNumber = dto.LicenseNumber;
            staff.ModifiedAt = DateTime.Now;

            _context.MstDeliveryStaffs.Update(staff);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPut("owner/{id}")]
        public async Task<IActionResult> UpdateStaffByOwner(int id, [FromBody]CreateDeliveryStaffDTO dto)
        {
            var staff = await _context.MstDeliveryStaffs
                .Include(s => s.User) // 👈 load User relation
                .FirstOrDefaultAsync(s => s.StaffId == id);
            if (staff == null)
            {
                return NotFound();
            }
            staff.User.UserName = dto.FullName;
            staff.User.Email = dto.Email;
            staff.User.Phone = dto.Phone;
            staff.ZoneId = dto.ZoneId;
            staff.ModifiedAt = DateTime.Now;

            _context.MstDeliveryStaffs.Update(staff);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("assignment-Modal")]
        public async Task<IActionResult> GetStaffForAssign()
        {
            var staffList = await _context.MstDeliveryStaffs
                .Include(s => s.User)
                .Include(s => s.Zone)
                .Select(s => new
                {
                    id = s.StaffId,
                    name = s.User.UserName,
                    phone = s.User.Phone,
                    email = s.User.Email,
                    zone = s.Zone.ZoneName,
                    activeDeliveries = s.CurrentLoad,
                    status = s.Status.ToLower(),
                    rating = s.Rating,
                    avatar = s.User.ProfileImageUrl ?? "https://localhost:7188/uploads/dummy_profileImage.jpg"
                }).ToArrayAsync();
            return Ok(staffList);
        }

        [HttpPut("{staffId}/availability")]
        public async Task<IActionResult> ToggleAvailability(int staffId, [FromBody] bool isOnline)
        {
            var staff = await _context.MstDeliveryStaffs.FindAsync(staffId);

            if (staff == null)
            {
                return NotFound(new { Message = "Delivery staff not found" });
            }

            // ✅ Map boolean to string in DB
            staff.Status = isOnline ? "Available" : "Unavailable";
            staff.ModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                staffId = staff.StaffId,
                isOnline = isOnline,
                availabilityStatus = staff.Status
            });
        }


        private string GenerateRandomPassword(int length = 10)
        {
            const string chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789!@#$%";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }
}
