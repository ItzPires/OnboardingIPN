using API.Types;

namespace API.Models.Dto
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime Deadline { get; set; }
        public States State { get; set; }
        public ProjectDto Project { get; set; }
        public UserDto Programmer { get; set; }
    }
}