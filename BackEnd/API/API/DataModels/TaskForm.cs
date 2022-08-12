using API.Types;
using System.ComponentModel.DataAnnotations;

namespace API.DataModels
{
    public class TaskForm
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public DateTime Deadline { get; set; }
        [Required]
        public States State { get; set; }
        [Required]
        public int IdProject { get; set; }
        [Required]
        public string? UsernameProgrammer { get; set; }
    }
}
