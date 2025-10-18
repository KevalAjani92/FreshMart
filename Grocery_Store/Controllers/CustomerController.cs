using Grocery_Store.DTOs;
using Grocery_Store.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;

        public CustomerController(GroceryStoreDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers = await _context.MstCustomers
                .Include(c => c.User)
                .Select(c => new CustomerDTO
                {
                    CustomerID = c.CustomerId,
                    UserID = c.UserId,
                    UserName = c.User.UserName,
                    Email = c.User.Email,
                    Phone = c.User.Phone,
                    Address = c.Address,
                    City = c.City,
                    State = c.State,
                    PinCode = c.Pincode
                })
                .ToListAsync();
            return Ok(customers);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByID(int id)
        {
            var customer = await _context.MstCustomers
                .Where(c => c.CustomerId == id)
                .Include(c => c.User)
                .Select(c => new CustomerDTO
                {
                    CustomerID = c.CustomerId,
                    UserID = c.UserId,
                    UserName = c.User.UserName,
                    Email = c.User.Email,
                    Phone = c.User.Phone,
                    Address = c.Address,
                    City = c.City,
                    State = c.State,
                    PinCode = c.Pincode
                })
                .FirstOrDefaultAsync();
            if(customer == null)
            {
                return NotFound("Customer Not Found");
            }
            return Ok(customer);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCustomerDTO dto)
        {
            var customer = new MstCustomer
            {
                UserId = dto.UserID,
                Address = dto.Address,
                City = dto.City,
                State = dto.State,
                Pincode = dto.PinCode
            };
            _context.Add(customer);
            await _context.SaveChangesAsync();
            return Ok("Customer added Successfully");
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCustomerDTO dto)
        {
            var customer = await _context.MstCustomers.FindAsync(id);
            if(customer == null)
            {
                return NotFound();
            }
            customer.Address = dto.Address;
            customer.City = dto.City;
            customer.State = dto.State;
            customer.Pincode = dto.PinCode;
            customer.ModifiedAt = DateTime.Now;

            _context.MstCustomers.Update(customer);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("profile/{id}")]
        public async Task<IActionResult> GetCustomerProfile(int id)
        {
            var customer = await _context.MstCustomers
                .Where(c => c.CustomerId == id)
                .Include(c => c.User)
                .Include(c => c.MstOrders)
                .Select(c => new CustomerProfileDTO
                {
                    UserName = c.User.UserName,
                    Email = c.User.Email,
                    Phone = c.User.Phone,
                    profileImageUrl = c.User.ProfileImageUrl,
                    MemberSince = c.User.CreatedAt.Value.ToString("yyyy"),
                    TotalOrders = c.MstOrders.Count,
                    TotalSpent = (decimal)c.MstOrders.Sum(o => o.FinalAmount)
                })
                .FirstOrDefaultAsync();
            if(customer == null)
            {
                return NotFound("Customer Details Not Found");
            }
            return Ok(customer);
        }
        
    }
}
