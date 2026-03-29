using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AILEXBA_Project.Models
{
    public class Question
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public string Level { get; set; }
        public string Explanation { get; set; }

        public int SubjectId { get; set; }
        public Subject ? Subject { get; set; } // Liên kết tới Môn học

        public List<Answer> Answers { get; set; } // Danh sách đáp án
    }
}