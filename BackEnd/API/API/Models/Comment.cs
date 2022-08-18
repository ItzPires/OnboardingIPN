using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Content { get; set; }
        [Required]
        public User Writer { get; set; }
        [Required]
        public bool isDeleted { get; set; }
    }
}
