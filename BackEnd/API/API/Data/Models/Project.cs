using API.Types;
using System.ComponentModel.DataAnnotations;

namespace API.Models.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public float Budget { get; set; }
        [Required]
        public States State { get; set; }
        [Required]
        public User Manager { get; set; }
        [Required]
        public bool isDeleted { get; set; }
    }
}
