using Grocery_Store.DTOs;
using Grocery_Store.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoryController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;

        public SubCategoryController(GroceryStoreDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var subCategories = await _context.MstSubCategories
                .Include(s => s.Category)
                .Select(s => new SubCategoryDTO
                {
                    SubCategoryID = s.SubCategoryId,
                    SubCategoryName = s.SubCategoryName,
                    CategoryID = s.CategoryId,
                    CategoryName = s.Category.Name
                }).ToListAsync();
            return Ok(subCategories);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSubCategoryDTO dto)
        {
            var subCategory = await _context.MstSubCategories
                .Where(s => s.SubCategoryName.ToLower() == dto.SubCategoryName.ToLower())
                .FirstOrDefaultAsync();
            if(subCategory != null)
            {
                return BadRequest("Subcategory Already Exist");
            }
            var newSubCategory = new MstSubCategory
            {
                SubCategoryName = dto.SubCategoryName,
                CategoryId = dto.CategoryID
            };
            _context.MstSubCategories.Add(newSubCategory);
            await _context.SaveChangesAsync();
            return Ok("Subcategory Added Successfully");
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateSubCategoryDTO dto)
        {
            var subCategory = await _context.MstSubCategories.FindAsync(id);
            if(subCategory == null)
            {
                return NotFound("Subcategory Not Found");
            }
            bool isDuplicate = await _context.MstSubCategories
                .AnyAsync(s => s.SubCategoryName.ToLower() == dto.SubCategoryName.ToLower() && s.SubCategoryId != id);
            if(isDuplicate)
            {
                return BadRequest("Subcategory Already Exist");
            }
            subCategory.SubCategoryName = dto.SubCategoryName;
            subCategory.CategoryId = dto.CategoryID;
            _context.MstSubCategories.Update(subCategory);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var subCategory = await _context.MstSubCategories.FindAsync(id);
            if (subCategory == null)
            {
                return NotFound("Subcategory Not Found");
            }
            _context.MstSubCategories.Remove(subCategory);
            await _context.SaveChangesAsync();
            return Ok("Subcategory Deleted Successfully");
        }
        [HttpGet("SubCategoryDropDown")]
        public async Task<IActionResult> GetSubCategoryDropDown()
        {
            var dropDown = await _context.MstSubCategories
                .Select(s => new SubCategoryDropDownDTO
                {
                    SubCategoryID = s.SubCategoryId,
                    SubCategoryName = s.SubCategoryName,
                    CategoryID = s.CategoryId
                })
                .ToListAsync();
            return Ok(dropDown);
        }
    }
}
