using System.ComponentModel.DataAnnotations;

namespace API.DataModels
{
    public class RegisterForm
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Role is required")]
        public bool isManager { get; set; }
    }
}
