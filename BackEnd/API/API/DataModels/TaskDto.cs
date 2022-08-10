namespace API.DataModels
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime Deadline { get; set; }
        public int State { get; set; }
        public ProjectDto Project { get; set; }
        public UserDto Programmer { get; set; }
    }
}