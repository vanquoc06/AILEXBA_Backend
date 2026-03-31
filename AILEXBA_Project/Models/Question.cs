using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AILEXBA_Project.Models
{
    public class Question
    {
        [Key]
        public int Id { get; set; }

        public string Content { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty;
        public string Explanation { get; set; } = string.Empty;

        public int SubjectId { get; set; }
        public Subject? Subject { get; set; }

     
        public List<Answer> Answers { get; set; } = new List<Answer>();
    }
}