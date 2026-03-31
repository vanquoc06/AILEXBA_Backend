using System.ComponentModel.DataAnnotations;

namespace AILEXBA_Project.Models
{
    public class Exam
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        public int SubjectId { get; set; }

        [Required]
        public int DurationMinutes { get; set; } // Thời gian làm bài (PB10)

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Trạng thái sử dụng (PB16)
        public bool IsActive { get; set; } = true;
    }
}