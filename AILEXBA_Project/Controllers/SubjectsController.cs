using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AILEXBA_Project.Data;
using AILEXBA_Project.Models;
using System.Threading.Tasks;

namespace AILEXBA_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubjectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Lấy danh sách môn học
        [HttpGet]
        public async Task<IActionResult> GetSubjects()
        {
            var subjects = await _context.Subjects.ToListAsync();
            return Ok(subjects);
        }

        // Thêm môn học mới (VD: Toán, Tiếng Anh)
        [HttpPost]
        public async Task<IActionResult> AddSubject([FromBody] Subject subject)
        {
            _context.Subjects.Add(subject);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Đã thêm môn học thành công!", subjectId = subject.Id });
        }
    }
}