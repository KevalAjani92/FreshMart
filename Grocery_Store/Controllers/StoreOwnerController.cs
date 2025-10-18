using Grocery_Store.DTOs;
using Grocery_Store.Helpers;
using Grocery_Store.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreOwnerController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;
        private readonly IWebHostEnvironment _env;
        public StoreOwnerController(GroceryStoreDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOwnerByID(int id)
        {
            var storeOwner = await _context.MstStoreOwners
                .Where(s => s.StoreOwnerId == id)
                .Include(s => s.User)
                .Select(s => new StoreOwnerDTO
                {
                    StoreOwnerID = s.StoreOwnerId,
                    UserID = s.UserId,
                    UserName = s.User.UserName,
                    Email = s.User.Email,
                    Phone = s.User.Phone,
                    ProfileImageUrl = s.User.ProfileImageUrl,
                    JoinedAt = s.CreatedAt
                })
                .FirstOrDefaultAsync();
            if (storeOwner == null)
                return NotFound();

            return Ok(storeOwner);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStoreOwner(int id, [FromForm]UpdateStoreOwnerDTO dto)
        {
            var storeOwner = await _context.MstStoreOwners
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.StoreOwnerId == id);
            if (storeOwner == null)
                return NotFound();

            storeOwner.User.UserName = dto.UserName;
            storeOwner.User.Email = dto.Email;
            storeOwner.User.Phone = dto.Phone;
            storeOwner.User.ModifiedAt = DateTime.Now;
            
            if(dto.Image != null && dto.Image.Length > 0)
            {
                //Delete Old Image
                FileHelper.DeleteImage(storeOwner.User.ProfileImageUrl, _env);

                var (success,newImageUrl,error) = await FileHelper.SaveImageAsync(dto.Image, _env,Request);
                if(!success)
                    return BadRequest(error);

                storeOwner.User.ProfileImageUrl = newImageUrl;
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPut("remove-image/{id}")]
        public async Task<IActionResult> RemoveProfileImage(int id)
        {
            var storeOwner = await _context.MstStoreOwners.FindAsync(id);
            if (storeOwner == null)
                return NotFound("Store owner not found.");

            var user = await _context.MstUsers.FindAsync(storeOwner.UserId);
            if (user == null)
                return NotFound("User not found.");

            FileHelper.DeleteImage(user.ProfileImageUrl, _env);
            user.ProfileImageUrl = null;
            user.ModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Profile image removed successfully." });
        }
    }
}
