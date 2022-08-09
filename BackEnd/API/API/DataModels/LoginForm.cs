using System.ComponentModel.DataAnnotations;

namespace API.DataModels
{
    public class LoginForm
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}
