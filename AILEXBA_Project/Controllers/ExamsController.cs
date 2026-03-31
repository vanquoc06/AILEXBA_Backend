using Microsoft.AspNetCore.Mvc;
using AILEXBA_Project.Data;
using AILEXBA_Project.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace AILEXBA_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExamsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // PB09: Lấy danh sách đề thi cho Người dùng & Admin
        [HttpGet]
        public async Task<IActionResult> GetExams()
        {
            var exams = await _context.Exams.ToListAsync();
            return Ok(exams);
        }

        // PB16: Admin tạo mới đề thi
        [HttpPost]
        public async Task<IActionResult> CreateExam([FromBody] Exam exam)
        {
            _context.Exams.Add(exam);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Tạo đề thi thành công!", examId = exam.Id });
        }

        // PB16: Admin cập nhật đề thi
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExam(int id, [FromBody] Exam exam)
        {
            var existingExam = await _context.Exams.FindAsync(id);
            if (existingExam == null) return NotFound(new { message = "Không tìm thấy đề thi." });

            existingExam.Title = exam.Title;
            existingExam.DurationMinutes = exam.DurationMinutes;
            existingExam.IsActive = exam.IsActive;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Cập nhật đề thi thành công!" });
        }

        // PB16: Admin xóa đề thi
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExam(int id)
        {
            var exam = await _context.Exams.FindAsync(id);
            if (exam == null) return NotFound(new { message = "Đề thi không tồn tại." });

            _context.Exams.Remove(exam);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Xóa đề thi thành công!" });
        }
    }
}