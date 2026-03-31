using Microsoft.AspNetCore.Mvc;
using AILEXBA_Project.Data;
using AILEXBA_Project.Models;
using AILEXBA_Project.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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

        // PB08: Quản lý thông tin cá nhân - Xem Profile
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfile(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "Không tìm thấy người dùng." });

            return Ok(new
            {
                id = user.Id,
                fullName = user.FullName,
                email = user.Email,
                role = user.Role
            });
        }

        // PB08: Quản lý thông tin cá nhân - Cập nhật Profile
        [HttpPut("{id}/profile")]
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] UpdateProfileRequest request)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "Không tìm thấy người dùng." });

            user.FullName = request.FullName;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật thông tin thành công!" });
        }

        // PB17: Quản lý người dùng - Danh sách cho Admin
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new { u.Id, u.FullName, u.Email, u.Role })
                .ToListAsync();

            return Ok(users);
        }

        // PB17: Quản lý người dùng - Admin xóa tài khoản
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "Người dùng không tồn tại." });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa người dùng thành công!" });
        }
    }
}