using System.ComponentModel.DataAnnotations;

namespace API.Models.Dto
{
    public class CommentForm
    {
        [Required]
        public string? Content { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string WriterUserName { get; set; }
        [Required]
        public int TaskId { get; set; }
    }
}
