using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace API.Models.Models
{
    public class User : IdentityUser
    {
        [Required]
        public bool isDeleted { get; set; }
    }
}
