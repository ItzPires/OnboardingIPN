using API.Models;

namespace API.Models.Dto
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public float Budget { get; set; }
        public int State { get; set; }
        public UserDto Manager { get; set; }
    }
}
