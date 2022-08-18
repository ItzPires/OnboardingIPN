using API.Types;
using System.ComponentModel.DataAnnotations;

namespace API.DataModels
{
    public class CommentForm
    {
        [Required]
        public string? Content { get; set; }
        [Required]
        public string WriterUserName { get; set; }
        [Required]
        public int TaskId { get; set; }
    }
}
