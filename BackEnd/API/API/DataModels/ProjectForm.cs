using API.Types;
using System.ComponentModel.DataAnnotations;

namespace API.DataModels
{
    public class ProjectForm
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public float Budget { get; set; }
        [Required]
        public ProjectState State { get; set; }
}
}
