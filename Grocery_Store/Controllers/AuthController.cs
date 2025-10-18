using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FluentValidation;
using Grocery_Store.DTOs;
using Grocery_Store.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(GroceryStoreDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpGet("me")]
        [Authorize] // Require valid JWT in cookie
        public IActionResult Me()
        {
            var user = GetUserFromClaims();
            if (user == null)
                return Unauthorized(new { message = "User not found" });

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
        {
            if (await _context.MstUsers.AnyAsync(u => u.Email == dto.Email || u.Phone == dto.Phone))
            {
                return BadRequest("Email Or Phone Number Already Exist");
            }
            var user = new MstUser
            {
                UserName = dto.UserName,
                Email = dto.Email,
                Phone = dto.Phone,
                Password = dto.Password,
            };
            _context.MstUsers.Add(user);
            await _context.SaveChangesAsync();
            return Ok("User Registered Successfully");
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _context.MstUsers.FirstOrDefaultAsync(u => u.Email == dto.Email && u.Password == dto.Password);

            if(user == null)
            {
                return Unauthorized("Invalid Credentials");
            }
            var token = GenerateJwtToken(user);

            Response.Cookies.Append("jwt_token", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(1)
            });

            return Ok(new {
                token,    
                user = new UserDto
                {
                    UserID = user.UserId,
                    UserName = user.UserName,
                    Email = user.Email,
                    Phone = user.Phone,
                    Role = user.Role,
                }
            });
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt_token",new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(1)
            });
            return Ok(new { message = "Logged out successfully" });
        }

        // 🔑 Generate Token with Role & Expiry from appsettings.json
        private string GenerateJwtToken(MstUser user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            Console.WriteLine(jwtSettings.ToString());
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var expiryMinutes = Convert.ToDouble(jwtSettings["TokenExpiryMinutes"]);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(expiryMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private object? GetUserFromClaims()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null || !identity.IsAuthenticated)
                return null;

            var claims = identity.Claims.ToList();
            var role = claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
            var userId = int.Parse(claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ?? "0");

            int? roleId = null;
            switch (role)
            {
                case "Customer":
                    roleId = _context.MstCustomers
                                    .Where(c => c.UserId ==  userId)
                                    .Select(c => c.CustomerId)
                                    .FirstOrDefault();
                    break;
                case "StoreOwner":
                    roleId = _context.MstStoreOwners
                                    .Where(s => s.UserId == userId)
                                    .Select(s => s.StoreOwnerId)
                                    .FirstOrDefault();
                    break;
                case "DeliveryStaff":
                    roleId = _context.MstDeliveryStaffs
                                    .Where(d => d.UserId == userId)
                                    .Select(d => d.StaffId)
                                    .FirstOrDefault();
                    break;
            }


            return new
            {
                Id = userId,
                Name = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                Email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
                Role = role,
                RoleId = roleId
            };
        }
    }
}
