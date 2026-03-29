using System.ComponentModel.DataAnnotations;

namespace AILEXBA_Project.Models
{
    public class Answer
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; } // Trả lời đúng hay sai

        public int QuestionId { get; set; }
        public Question ? Question { get; set; } // Liên kết ngược lại Câu hỏi
    }
}