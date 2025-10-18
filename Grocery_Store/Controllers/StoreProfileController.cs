using Grocery_Store.DTOs;
using Grocery_Store.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreProfileController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;

        public StoreProfileController(GroceryStoreDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStoreProfile(int id)
        {
            var store = await _context.MstStoreProfiles
                .Include(s => s.Owner)
                .ThenInclude(o => o.User)
                .FirstOrDefaultAsync(s => s.StoreId == id);

            if (store == null || store.Owner == null || store.Owner.User == null)
                return NotFound();

            var result = new StoreProfileDTO
            {
                StoreID = store.StoreId,
                StoreName = store.StoreName,
                Address = store.Address,
                Phone = store.Phone,
                Email = store.Email,
                DeliveryRadiusKM = store.DeliveryRadiusKm,
                Description = store.Description,
                OpeningTime = DateTime.Today.Add(store.OpeningTime).ToString("hh:mm tt"),
                ClosingTime = DateTime.Today.Add(store.ClosingTime).ToString("hh:mm tt"),
                GSTNumber = store.Gstnumber,

                OwnerID = store.OwnerId,
                UserID = store.Owner.User.UserId,
                OwnerName = store.Owner.User.UserName,
                OwnerEmail = store.Owner.User.Email,
                OwnerPhone = store.Owner.User.Phone
            };
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateStoreProfile([FromBody] CreateStoreProfileDTO dto)
        {
            var temp = await _context.MstStoreProfiles.Where(s => s.StoreName.ToLower() == dto.StoreName.ToLower()).FirstOrDefaultAsync();
            if(temp != null)
            {
                return BadRequest("Another Store with given Name Already exist");
            }
            var store = new MstStoreProfile
            {
                StoreName = dto.StoreName,
                OwnerId = dto.OwnerID,
                Address = dto.Address,
                Phone = dto.Phone,
                Email = dto.Email,
                DeliveryRadiusKm = dto.DeliveryRadiusKM,
                Description = dto.Description,
                OpeningTime = dto.OpeningTime,
                ClosingTime = dto.ClosingTime,
                Gstnumber = dto.GSTNumber,
                CreatedAt = DateTime.UtcNow,
                ModifiedAt = DateTime.UtcNow
            };

            _context.MstStoreProfiles.Add(store);
            await _context.SaveChangesAsync();
            return Ok("Store Created Successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStoreProfile(int id, [FromBody] UpdateStoreProfileDTO dto)
        {
            var storeProfile = await _context.MstStoreProfiles.FindAsync(id);
            if(storeProfile == null)
            {
                return NotFound("Store Not Found");
            }
            bool isDuplicate = await _context.MstStoreProfiles
                .AnyAsync(s => s.StoreName.ToLower() == dto.StoreName.ToLower() && s.StoreId != id);

            if(isDuplicate)
            {
                return BadRequest("Another Store With Same Name already exists.");
            }

            storeProfile.StoreName = dto.StoreName;
            storeProfile.Address = dto.Address;
            storeProfile.Phone = dto.Phone;
            storeProfile.Email = dto.Email;
            storeProfile.DeliveryRadiusKm = dto.DeliveryRadiusKM;
            storeProfile.Description = dto.Description;
            storeProfile.OpeningTime = dto.OpeningTime;
            storeProfile.ClosingTime = dto.ClosingTime;
            storeProfile.Gstnumber = dto.GSTNumber;
            storeProfile.ModifiedAt = DateTime.UtcNow;

            _context.MstStoreProfiles.Update(storeProfile);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
