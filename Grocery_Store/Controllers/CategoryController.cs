using Grocery_Store.DTOs;
using Grocery_Store.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;
        
        public CategoryController(GroceryStoreDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var productCounts = await _context.MstProducts
                .Where(p => p.IsActive)
                .GroupBy(p => p.CategoryId)
                .Select(g => new
                {
                    CategoryId = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            // Then materialize categories separately and join in memory
            var categories = await _context.MstCategories
                //.Where(c => c.IsActive)
                .ToListAsync();

            var result = categories.Select(c => new CategoryDTO
            {
                CategoryID = c.CategoryId,
                Name = c.Name,
                Description = c.Description,
                IconName = c.IconName,
                IsActive = c.IsActive,
                ProductCount = productCounts.FirstOrDefault(pc => pc.CategoryId == c.CategoryId)?.Count ?? 0
            }).ToList();
            return Ok(result);
        }
        [HttpGet("owner/GetAll")]
        public async Task<IActionResult> OwnerGetAll(
            string? searchTerm = null,
            string? sortBy = "name",
            int pageNumber = 1,
            int pageSize = 10
        )
        {
            // Base query (Categories + Subcategories)
            var query = _context.MstCategories
                .Include(c => c.MstSubCategories)
                .AsQueryable();

            // 🔹 Filter
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(c => c.Name.Contains(searchTerm));
            }


            // 🔹 Projection with DTO
            var categoriesQuery = query.Select(c => new CategoryDTO
            {
                CategoryID = c.CategoryId,
                Name = c.Name,
                Description = c.Description,
                IconName = c.IconName,
                IsActive = c.IsActive,
                ProductCount = _context.MstProducts
                    .Where(p => p.CategoryId == c.CategoryId)
                    .Count(),
                SubCategoryCount = c.MstSubCategories.Count
            });

            // 🔹 Sorting
            categoriesQuery = sortBy switch
            {
                "products-high" => categoriesQuery.OrderByDescending(c => c.ProductCount),
                "products-low" => categoriesQuery.OrderBy(c => c.ProductCount),
                "name" => categoriesQuery.OrderBy(c => c.Name),
                _ => categoriesQuery.OrderBy(c => c.Name)
            };

            // 🔹 Pagination
            var totalItems = await categoriesQuery.CountAsync();
            var categories = await categoriesQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // 🔹 Response Wrapper
            var response = new
            {
                TotalItems = totalItems,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize),
                Items = categories,
                Stats = new
                {
                    TotalCategories = await _context.MstCategories.CountAsync(),
                    ActiveCategories = await _context.MstCategories.CountAsync(c => c.IsActive),
                    EmptyCategories = await _context.MstCategories
                        .CountAsync(c => !_context.MstProducts.Any(p => p.CategoryId == c.CategoryId)),
                                MostPopularCategory = await _context.MstCategories
                        .Select(c => new {
                            c.CategoryId,
                            c.Name,
                            ProductCount = _context.MstProducts.Count(p => p.CategoryId == c.CategoryId)
                        })
                        .OrderByDescending(c => c.ProductCount)
                        .FirstOrDefaultAsync()
                }
            };

            return Ok(response);
        }


        [HttpGet("featured-categories")]
        public async Task<IActionResult> GetFeaturedCategory()
        {
            var productCounts = await _context.MstProducts
                .Where(p => p.IsActive)
                .GroupBy(p => p.CategoryId)
                .Select(g => new
                {
                    CategoryId = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            // Then materialize categories separately and join in memory
            var categories = await _context.MstCategories
                .Take(6)
                //.Where(c => c.IsActive)
                .ToListAsync();

            var result = categories.Select(c => new CategoryDTO
            {
                CategoryID = c.CategoryId,
                Name = c.Name,
                Description = c.Description,
                IconName = c.IconName,
                IsActive = c.IsActive,
                ProductCount = productCounts.FirstOrDefault(pc => pc.CategoryId == c.CategoryId)?.Count ?? 0
            }).ToList();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCategoryDTO dto)
        {
            var category = await _context.MstCategories
                .Where(c => c.Name.ToLower() == dto.Name.ToLower())
                .FirstOrDefaultAsync();
            if(category != null)
            {
                return BadRequest("Category With Given Name Already Exist");
            }
            var newCategory = new MstCategory
            {
                Name = dto.Name,
                Description = dto.Description,
                IconName = dto.IconName
            };
            _context.MstCategories.Add(newCategory);
            await _context.SaveChangesAsync();
            return Ok("NewCategory Added Successfully");
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCategoryDTO dto)
        {
            var category = await _context.MstCategories.FindAsync(id);
            if(category == null)
            {
                return NotFound("Category Not Found");
            }

            bool isDuplicate = await _context.MstCategories
                .AnyAsync(c => c.Name.ToLower() == dto.Name.ToLower() && c.CategoryId != id);

            if(isDuplicate)
            {
                return BadRequest("Another Category With Same Name already exists.");
            }
            category.Name = dto.Name;
            category.Description = dto.Description;
            category.IconName = dto.IconName;
            category.IsActive = dto.IsActive;
            category.ModifiedAt = DateTime.Now;

            _context.MstCategories.Update(category);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _context.MstCategories.FindAsync(id);
            if (category == null)
            {
                return NotFound("Category Not Found");
            }
            
            _context.MstCategories.Remove(category);
            await _context.SaveChangesAsync();
            return Ok("Category Deleted Successfully");
        }
        [HttpGet("CategoryDropDown")]
        public async Task<IActionResult> GetCategoryDorpDown()
        {
            var dropDown = await _context.MstCategories
                .Select(c => new CategoryDropDownDTO
                {
                    CategoryID = c.CategoryId,
                    Name = c.Name,
                })
                .ToListAsync();
            return Ok(dropDown);
        }
    }
}
