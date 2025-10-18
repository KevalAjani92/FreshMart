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
    public class ProductController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ProductController(GroceryStoreDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] List<string> categories,
            [FromQuery] List<string> subcategories,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] int? minRating,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 4)
        {
            var query = _context.MstProducts
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .AsQueryable();

            // Filters
            if (categories != null && categories.Any())
                query = query.Where(p => categories.Contains(p.Category.Name));

            if (subcategories != null && subcategories.Any())
                query = query.Where(p => subcategories.Contains(p.SubCategory.SubCategoryName));

            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice.Value);

            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice.Value);

            //if (minRating.HasValue)
            //    query = query.Where(p => p.Rating >= minRating.Value); // Ensure Rating exists in model

            // Pagination
            var totalItems = await query.CountAsync();
            var products = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ProductDTO
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Brand = p.Brand,
                    Description = p.Description,
                    IsFeatured = p.IsFeatured,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    Price = p.Price,
                    ImageUrl = p.ImageUrl,
                    CurrentStock = p.CurrentStock,
                    LowStockValue = p.LowStockValue,
                    IsActive = p.IsActive,
                    StoreOwnerId = p.StoreOwnerId,
                    SubCategoryId = p.SubCategoryId,
                    SubCategoryName = p.SubCategory.SubCategoryName,
                    //Rating = p.Rating,           // Make sure this field exists
                    //Reviews = p.ReviewsCount     // Optional
                })
                .ToListAsync();

            return Ok(new
            {
                totalItems,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling(totalItems / (double)pageSize),
                products
            });
        }

        [HttpGet("owner-all-product")]
        public async Task<IActionResult> Owner_GetAllProducts(
            string? search = null,
            int? categoryId = null,
            string? status = null,
            //decimal? minPrice = null,
            //decimal? maxPrice = null,
            string? sortBy = "name",
            int pageNumber = 1,
            int pageSize = 12)
        {
            var query = _context.MstProducts
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .AsQueryable();

            // 🔎 Search
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p =>
                    p.Name.Contains(search) || p.Brand.Contains(search));
            }

            // 📂 Category Filter
            if (categoryId.HasValue && categoryId.Value > 0)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

            // 📦 Status Filter (available, low-stock, out-of-stock)
            if (!string.IsNullOrEmpty(status) && status != "all")
            {
                query = status switch
                {
                    "available" => query.Where(p => p.CurrentStock > p.LowStockValue),
                    "low-stock" => query.Where(p => p.CurrentStock > 0 && p.CurrentStock <= p.LowStockValue),
                    "out-of-stock" => query.Where(p => p.CurrentStock == 0),
                    _ => query
                };
            }

            // 💰 Price Filter
            //if (minPrice.HasValue)
            //    query = query.Where(p => p.Price >= minPrice.Value);

            //if (maxPrice.HasValue)
            //    query = query.Where(p => p.Price <= maxPrice.Value);

            // ↕️ Sorting
            query = sortBy switch
            {
                "price-low" => query.OrderBy(p => p.Price),
                "price-high" => query.OrderByDescending(p => p.Price),
                "stock" => query.OrderByDescending(p => p.CurrentStock),
                "name" => query.OrderBy(p => p.Name),
                _ => query.OrderBy(p => p.Name)
            };

            // 📄 Pagination
            var totalRecords = await query.CountAsync();
            var products = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ProductDTO
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Brand = p.Brand,
                    Description = p.Description,
                    IsFeatured = p.IsFeatured,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    SubCategoryId = p.SubCategoryId,
                    SubCategoryName = p.SubCategory != null ? p.SubCategory.SubCategoryName : null,
                    Price = p.Price,
                    ImageUrl = p.ImageUrl,
                    CurrentStock = p.CurrentStock,
                    LowStockValue = p.LowStockValue,
                    IsActive = p.IsActive,
                    Status = p.CurrentStock == 0
                        ? "out-of-stock"
                        : (p.CurrentStock <= p.LowStockValue ? "low-stock" : "available")
                })
                .ToListAsync();

            return Ok(new
            {
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pageSize),
                Data = products,
                Stats = new
                {
                    TotalProducts = await _context.MstProducts.CountAsync(),
                    ActiveProducts = await _context.MstProducts.CountAsync(p => p.IsActive),
                    LowStockProducts = await _context.MstProducts
                        .CountAsync(p => p.CurrentStock > 0 && p.CurrentStock <= p.LowStockValue),
                    OutOfStockProducts = await _context.MstProducts
                        .CountAsync(p => p.CurrentStock == 0)
                }
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByID(int id)
        {
            var product = await _context.MstProducts
                .Where(p => p.ProductId == id)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .Select(p => new ProductDTO
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Brand = p.Brand,
                    Description = p.Description,
                    IsFeatured = p.IsFeatured,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    Price = p.Price,
                    ImageUrl = p.ImageUrl,
                    CurrentStock = p.CurrentStock,
                    LowStockValue = p.LowStockValue,
                    IsActive = p.IsActive,
                    StoreOwnerId = p.StoreOwnerId,
                    SubCategoryId = p.SubCategoryId,
                    SubCategoryName = p.SubCategory.SubCategoryName
                }).FirstOrDefaultAsync();
            if(product == null)
            {
                return NotFound("Product Not Found");
            }
            return Ok(product);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateProductDTO dto)
        {
            var (success, imageUrl, error) = await FileHelper.SaveImageAsync(dto.Image, _env, Request);
            if (!success)
                return BadRequest();

            var product = new MstProduct
            {
                Name = dto.Name,
                Brand = dto.Brand,
                Description = dto.Description,
                IsFeatured = dto.IsFeatured,
                CategoryId = dto.CategoryId,
                SubCategoryId = dto.SubCategoryId,
                Price = dto.Price,
                ImageUrl = imageUrl,
                CurrentStock = dto.CurrentStock,
                LowStockValue = dto.LowStockValue,
                IsActive = dto.IsActive,
                StoreOwnerId = dto.StoreOwnerId
            };
            _context.MstProducts.Add(product);
            await _context.SaveChangesAsync();
            return Ok("Product Added Successfully");
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] CreateProductDTO dto)
        {
            var product = await _context.MstProducts.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            //string? newImageUrl = product.ImageUrl;

            // If a new image is uploaded
            if(dto.Image != null)
            {
                // Delete old image
                FileHelper.DeleteImage(product.ImageUrl, _env);

                // Save new image
                var (success, newImageUrl, error) = await FileHelper.SaveImageAsync(dto.Image, _env, Request);
                if (!success)
                    return BadRequest(error);
                product.ImageUrl = newImageUrl;

            }

            product.Name = dto.Name;
            product.Brand = dto.Brand;
            product.Description = dto.Description;
            product.IsFeatured = dto.IsFeatured;
            product.CategoryId = dto.CategoryId;
            product.SubCategoryId = dto.SubCategoryId;
            product.Price = dto.Price;
            //product.ImageUrl = newImageUrl;
            product.CurrentStock = dto.CurrentStock;
            product.LowStockValue = dto.LowStockValue;
            product.IsActive = dto.IsActive;
            product.StoreOwnerId = dto.StoreOwnerId;
            product.ModifiedAt = DateTime.Now;

            _context.MstProducts.Update(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.MstProducts.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            // Delete old image
            FileHelper.DeleteImage(product.ImageUrl, _env);
            _context.MstProducts.Remove(product);
            await _context.SaveChangesAsync();
            return Ok("Product Deleted Successfully");
        }
        [HttpGet("featured-products")]
        public async Task<IActionResult> GetFeaturedProducts()
        {
            var products = await _context.MstProducts
                .Where(p => p.IsFeatured)
                .OrderBy(p => Guid.NewGuid())
                .Take(6)
                .Select(p => new ProductDTO
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Brand = p.Brand,
                    Description = p.Description,
                    IsFeatured = p.IsFeatured,
                    Price = p.Price,
                    ImageUrl = p.ImageUrl,
                    IsActive = p.IsActive,
                })
                .ToListAsync();
            return Ok(products);
        }
    }
}
