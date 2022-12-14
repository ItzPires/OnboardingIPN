using API.Types;
using System.ComponentModel.DataAnnotations;

namespace API.Models.Dto
{
    public class ProjectForm
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public float Budget { get; set; }
        [Required]
        public States State { get; set; }
    }
}
