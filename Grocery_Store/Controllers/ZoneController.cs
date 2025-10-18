using Grocery_Store.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZoneController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;
        public ZoneController(GroceryStoreDbContext context)
        {
            _context = context;
        }

        [HttpGet("zone-dropDown")]
        public async Task<IActionResult> GetZoneDropDown()
        {
            var zones = await _context.MstZones
                .Select(z => new
                {
                    Id = z.ZoneId,
                    Name = z.ZoneName,
                }).ToListAsync();
            if(zones == null || zones.Count == 0) return NotFound();

            return Ok(zones);

        }
        
    }
}
