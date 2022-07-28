using System.ComponentModel.DataAnnotations;

namespace API.Models.Models
{
    public class Task
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public DateTime Deadline { get; set; }
        [Required]
        public string? State { get; set; }
        [Required]
        public Project Project { get; set; }
        [Required]
        public User Programmer { get; set; }
    }
}
