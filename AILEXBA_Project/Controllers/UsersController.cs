using Microsoft.AspNetCore.Mvc;
using AILEXBA_Project.Data;
using AILEXBA_Project.Models;
using AILEXBA_Project.DTOs;
using System.Threading.Tasks;

namespace AILEXBA_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Lấy thông tin cá nhân (PB07)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfile(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "Không tìm thấy người dùng." });

            // Trả về thông tin (tuyệt đối không trả về PasswordHash)
            return Ok(new
            {
                id = user.Id,
                fullName = user.FullName,
                email = user.Email,
                role = user.Role,
                createdAt = user.CreatedAt
            });
        }

        // 2. Cập nhật thông tin cá nhân (PB07)
        [HttpPut("{id}/profile")]
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] UpdateProfileRequest request)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "Không tìm thấy người dùng." });

            user.FullName = request.FullName; // Hiện tại chỉ cho phép đổi Tên

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật thông tin thành công!" });
        }

        // 3. Đổi mật khẩu (PB06)
        [HttpPost("{id}/change-password")]
        public async Task<IActionResult> ChangePassword(int id, [FromBody] ChangePasswordRequest request)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "Không tìm thấy người dùng." });

            // Kiểm tra mật khẩu cũ có khớp với mã Hash trong Database không
            if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, user.PasswordHash))
            {
                return BadRequest(new { message = "Mật khẩu cũ không chính xác." });
            }

            // Mã hóa mật khẩu mới và lưu lại
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đổi mật khẩu thành công!" });
        }
    }
}