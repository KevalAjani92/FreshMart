using System.Text;
using Grocery_Store.DTOs;
using Grocery_Store.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;
        public InvoiceController(GroceryStoreDbContext context)
        {
            _context = context;
        }
        [HttpGet("GetInvoiceDetails/{orderId}")]
        public async Task<IActionResult> GenerateInvoice(int orderId)
        {
            var order = await _context.MstOrders
                .Include(o => o.MstOrderItems)
                    .ThenInclude(o => o.Product)
                        .ThenInclude(p => p.Category)
                .Include(o => o.Customer)
                    .ThenInclude(c => c.User)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
                return NotFound();

            var dto = new InvoiceDTO
            {
                OrderId = order.OrderId,
                OrderNumber = order.OrderNumber,
                InvoiceDate = DateTime.Now,
                OrderDate = order.OrderDate,

                CustomerName = order.Customer.User.UserName,
                PhoneNumber = order.Customer.User.Phone,
                DeliveryAddress = String.Join(" , ",new string[] {order.Customer.Address,order.Customer.City,order.Customer.State,order.Customer.Pincode}.Where(x => !string.IsNullOrEmpty(x))),
                
                PaymentStatus = "Pending",
                PaymentMode = order.PaymentMode,
                DeliveryStatus = order.Status,

                Items = order.MstOrderItems.Select(i => new OrderItemResponseDTO
                {
                    ProductID = i.ProductId,
                    Name = i.Product.Name,
                    Category = i.Product.Category.Name,
                    Price = i.UnitPrice,
                    Quantity = i.Quantity,
                }).ToList(),

                TotalAmount = order.TotalAmount,
                DeliveryCharge = order.DeliveryCharge,
                FinalAmount = order.FinalAmount
            };

            return Ok(dto);
        }
    }
}
