using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace Api.Classes.Models
{
    public class User //: IdentityUser
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; } = "";
        [Required]
        public DateTime Deadline { get; set; }
        [Required]
        public string State { get; set; } = "";
    }
}
