using Grocery_Store.DTOs;
using Grocery_Store.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;

        public CartController(GroceryStoreDbContext context)
        {
            _context = context;
        }
        [HttpPost("AddToCart")]
        public async Task<IActionResult> AddItemToCart([FromBody] AddCartItemDTO dto)
        {
            try
            {
                // Step 1: Get or create cart
                var cart = await _context.MstCarts
                    .FirstOrDefaultAsync(c => c.CustomerId == dto.CustomerID);

                if (cart == null)
                {
                    cart = new MstCart
                    {
                        CustomerId = dto.CustomerID
                    };
                    _context.MstCarts.Add(cart);
                    await _context.SaveChangesAsync();
                }

                // Step 2: Get product and check if it exists
                var product = await _context.MstProducts
                    .FirstOrDefaultAsync(p => p.ProductId == dto.ProductID);

                if (product == null)
                    return NotFound("Product not found.");

                // Step 3: Check if item already exists in cart
                var existingCartItem = await _context.MstCartItems
                    .FirstOrDefaultAsync(ci => ci.CartId == cart.CartId && ci.ProductId == dto.ProductID);

                int newQuantity = dto.Quantity;

                if (existingCartItem != null)
                    newQuantity += existingCartItem.Quantity;

                // Step 4: Check stock constraint
                if (newQuantity > product.CurrentStock)
                {
                    return BadRequest(new
                    {
                        Message = $"Requested quantity ({newQuantity}) exceeds available stock ({product.CurrentStock})."
                    });
                }

                // Step 5: Add or update item
                if (existingCartItem != null)
                {
                    existingCartItem.Quantity += dto.Quantity;
                    _context.MstCartItems.Update(existingCartItem);
                }
                else
                {
                    var cartItem = new MstCartItem
                    {
                        CartId = cart.CartId,
                        ProductId = dto.ProductID,
                        Quantity = dto.Quantity
                    };
                    _context.MstCartItems.Add(cartItem);
                }

                await _context.SaveChangesAsync();

                return Ok("Item added to cart successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Message = "Failed to add item to cart",
                    Error = ex.Message
                });
            }
        }


        [HttpGet("GetCartItemsByUser")]
        public async Task<IActionResult> GetCartItemsByUser(int customerID)
        {
            var cart = await _context.MstCarts
                .Where(c => c.CustomerId == customerID)
                .Include(c => c.MstCartItems)
                    .ThenInclude(c => c.Product)
                .FirstOrDefaultAsync();
            if(cart == null)
            {
                return BadRequest("No Items");
            }
            var cartDTO = new CartDTO
            {
                CartID = cart.CartId,
                CustomerID = cart.CustomerId,
                Items = cart.MstCartItems.Select(item => new CartItemsDTO
                {
                    CartItemsID = item.CartItemId,
                    ProductID = item.ProductId,
                    Quantity = item.Quantity,
                    Name = item.Product.Name,
                    Brand = item.Product.Brand,
                    ImageUrl = item.Product.ImageUrl,
                    Price = item.Product.Price
                }).ToList()
            };
            return Ok(cartDTO);
        }
        [HttpPut("UpdateCartItemQuantity")]
        public async Task<IActionResult> UpdateCartItemQuantity([FromBody] UpdateCartItemDTO dto)
        {
            try
            {
                var cartItem = await _context.MstCartItems
                    .Include(ci => ci.Product)
                    .FirstOrDefaultAsync(ci => ci.CartItemId == dto.CartItemID);

                if (cartItem == null)
                    return NotFound("Cart item not found.");

                if (cartItem.Product == null)
                    return NotFound("Associated product not found.");

                if (dto.Quantity > cartItem.Product.CurrentStock)
                {
                    return BadRequest(new
                    {
                        Message = $"Requested quantity ({dto.Quantity}) exceeds available stock ({cartItem.Product.CurrentStock})."
                    });
                }

                cartItem.Quantity = dto.Quantity;
                _context.MstCartItems.Update(cartItem);
                await _context.SaveChangesAsync();

                return Ok("Cart item quantity updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Failed to update cart item", Error = ex.Message });
            }
        }

        [HttpDelete("DeleteCartItem/{cartItemId}")]
        public async Task<IActionResult> DeleteCartItem(int cartItemId)
        {
            try
            {
                var cartItem = await _context.MstCartItems
                    .FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId);

                if (cartItem == null)
                    return NotFound("Cart item not found.");

                _context.MstCartItems.Remove(cartItem);
                await _context.SaveChangesAsync();

                return Ok("Cart item deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Failed to delete cart item", Error = ex.Message });
            }
        }

    }
}
