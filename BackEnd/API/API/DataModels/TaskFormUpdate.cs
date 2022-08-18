using API.Types;
using System.ComponentModel.DataAnnotations;

namespace API.DataModels
{
    public class TaskFormUpdate
    {
        public string? Name { get; set; }
        public DateTime Deadline { get; set; }
        public States State { get; set; }
        public int IdProject { get; set; }
        public string? UsernameProgrammer { get; set; }
    }
}
