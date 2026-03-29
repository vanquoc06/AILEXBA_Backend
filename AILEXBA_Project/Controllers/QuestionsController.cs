using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AILEXBA_Project.Data;
using AILEXBA_Project.Models;
using System.Threading.Tasks;

namespace AILEXBA_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuestionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Lấy toàn bộ câu hỏi kèm đáp án để Frontend hiển thị đề thi
        [HttpGet]
        public async Task<IActionResult> GetQuestions()
        {
            var questions = await _context.Questions
                .Include(q => q.Answers) // Kéo theo danh sách đáp án
                .Include(q => q.Subject) // Kéo theo tên môn học
                .ToListAsync();

            return Ok(questions);
        }

        // Thêm câu hỏi mới kèm theo danh sách đáp án
        [HttpPost]
        public async Task<IActionResult> AddQuestion([FromBody] Question question)
        {
            // Kiểm tra xem Môn học (SubjectId) có tồn tại trong DB không
            var subjectExists = await _context.Subjects.AnyAsync(s => s.Id == question.SubjectId);
            if (!subjectExists)
            {
                return BadRequest(new { message = "Môn học không tồn tại. Vui lòng tạo môn học trước!" });
            }

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã thêm câu hỏi và đáp án thành công!", questionId = question.Id });
        }
    }
}