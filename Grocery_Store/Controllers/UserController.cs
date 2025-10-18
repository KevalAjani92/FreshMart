using Grocery_Store.DTOs;
using Grocery_Store.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;
        private readonly IWebHostEnvironment _env;

        public UserController(GroceryStoreDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }
        //[Authorize(Roles ="StoreOwner")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.MstUsers
                .Where(u => u.IsActive)
                .Select(u => new UserDto
                {
                    UserID = u.UserId,
                    UserName = u.UserName,
                    Email = u.Email,
                    Phone = u.Phone,
                    Role = u.Role,
                    ProfileImageUrl = u.ProfileImageUrl
                }).ToListAsync();

            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByID(int id)
        {
            var user = await _context.MstUsers
            .Where(u => u.UserId == id && u.IsActive)
            .Select(u => new UserDto
            {
                UserID = u.UserId,
                UserName = u.UserName,
                Email = u.Email,
                Phone = u.Phone,
                Role = u.Role,
                ProfileImageUrl= u.ProfileImageUrl
            }).FirstOrDefaultAsync();

            if (user == null) return NotFound("User not found");
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] RegisterUserDto dto)
        {
            var user = await _context.MstUsers.FindAsync(id);
            if (user == null || !user.IsActive) return NotFound("User not found");

            user.UserName = dto.UserName;
            user.Email = dto.Email;
            user.Phone = dto.Phone;
            //user.Password = dto.Password;
            user.ModifiedAt = DateTime.Now;

            _context.MstUsers.Update(user);
            await _context.SaveChangesAsync();
            return Ok("User updated");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.MstUsers.FindAsync(id);
            if (user == null || !user.IsActive) return NotFound("User not found");

            user.IsActive = false;
            user.ModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();
            return Ok("User deleted (soft delete)");
        }


        // 🛡️ This will require any authenticated user (no role restriction)
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            return Ok(new { message = "Welcome Authenticated User!" });
        }

        // 🛡️ Allow anonymous access (overrides controller-level authorize)
        [AllowAnonymous]
        [HttpGet("public-info")]
        public IActionResult PublicInfo()
        {
            return Ok(new { message = "This is public info, no login required." });
        }

        [HttpPut("update-profileImage/{userId}")]
        public async Task<IActionResult> UpdateProfileImage(int userId, [FromForm]UpdateProfileImageDTO dto, [FromQuery] bool remove = false)
        {
            var user = await _context.MstUsers.FindAsync(userId);
            if (user == null || !user.IsActive)
                return NotFound("User not found");

            // Profile Images Folder Path
            var folderPath = Path.Combine(_env.WebRootPath, "profile-images");
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath); // ✅ Create if not exists

            // Base URL (https://localhost:7188)
            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            // Case 1: Remove profile image
            if (remove ||dto.Image == null || dto.Image.Length == 0)
            {
                if (!string.IsNullOrEmpty(user.ProfileImageUrl))
                {
                    var oldImagePath = Path.Combine(_env.WebRootPath, user.ProfileImageUrl.Replace(baseUrl, "").TrimStart('/'));
                    if (System.IO.File.Exists(oldImagePath))
                        System.IO.File.Delete(oldImagePath);

                    user.ProfileImageUrl = null;
                    user.ModifiedAt = DateTime.Now;
                    await _context.SaveChangesAsync();
                }

                return Ok(new { message = "Profile image removed", profileImageUrl = (string?)null });
            }
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var ext = Path.GetExtension(dto.Image.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(ext))
            {
                return BadRequest("Invalid file type. Only JPG and PNG are allowed.");
            }

            // Case 2: Replace with new image
            if (!string.IsNullOrEmpty(user.ProfileImageUrl))
            {
                var oldImagePath = Path.Combine(_env.WebRootPath, user.ProfileImageUrl.Replace(baseUrl, "").TrimStart('/'));
                if (System.IO.File.Exists(oldImagePath))
                    System.IO.File.Delete(oldImagePath);
            }

            // Save new image
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Image.FileName)}";
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.Image.CopyToAsync(stream);
            }

            // ✅ Store full URL instead of relative path
            var imageUrl = $"{baseUrl}/profile-images/{fileName}";
            user.ProfileImageUrl = imageUrl;
            user.ModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Profile image updated", profileImageUrl = imageUrl });
        }
        [HttpPut("change-password/{userId}")]
        public async Task<IActionResult> ChangePassword(int userId, [FromBody] ChangePasswordDTO dto)
        {
            var user = await _context.MstUsers.FindAsync(userId);
            if (user == null || !user.IsActive)
                return NotFound("User not found");

            // Check current password (plaintext example, hash recommended)
            if (user.Password != dto.CurrentPassword)
                return BadRequest("Current password is incorrect");

            if (dto.NewPassword != dto.ConfirmPassword)
                return BadRequest("New password and confirmation do not match");

            // Save new password (store hashed in real project)
            user.Password = dto.NewPassword;
            user.ModifiedAt = DateTime.Now;

            _context.MstUsers.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Password changed successfully" });
        }

    }
}
