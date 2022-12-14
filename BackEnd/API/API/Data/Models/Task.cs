using API.Types;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public States State { get; set; }
        public int? ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
        public string? ProgrammerId { get; set; }
        [ForeignKey("ProgrammerId")]
        public User Programmer { get; set; }
        [Required]
        public bool isDeleted { get; set; }
    }
}
