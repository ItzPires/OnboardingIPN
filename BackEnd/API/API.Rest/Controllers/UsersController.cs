using API.Models.Models;
using API.Models.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Rest.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        public UsersController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("programmers")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<ActionResult<IEnumerable<User>>> GetProgrammers()
        {
            var result = await _userManager.GetUsersInRoleAsync(Roles.Programmer);

            return Ok(result);
        }

        [HttpGet]
        [Route("Managers")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<ActionResult<IEnumerable<User>>> GetManagers()
        {
            var result = await _userManager.GetUsersInRoleAsync(Roles.Manager);

            return Ok(result);
        }
    }
}
