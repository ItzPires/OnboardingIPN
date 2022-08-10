using API.DataModels;
using API.Models;
using API.Types;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public UsersController(
            UserManager<User> userManager,
           IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("programmers")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> GetProgrammers()
        {
            try {
                var result = await _userManager.GetUsersInRoleAsync(Roles.Programmer);
                return Ok(_mapper.Map<UserDto[]>(result));
            }
            catch (Exception ex)
            {
                return BadRequest("BackEnd: " + ex.Message);
            }
        }

        [HttpGet]
        [Route("Managers")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> GetManagers()
        {
            try
            {
                var result = await _userManager.GetUsersInRoleAsync(Roles.Manager);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("BackEnd: " + ex.Message);
            }
        }

        [HttpGet]
        [Route("Info/{username}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> GetInfoUser(string username)
        {
            try
            {
                var result = await _userManager.FindByNameAsync(username);
                return Ok(_mapper.Map<UserDto>(result));
            }
            catch (Exception ex)
            {
                return BadRequest("BackEnd: " + ex.Message);
            }
        }

        [HttpGet]
        [Route("Role/{username}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> GetRoleUser(string username)
        {
            try
            {
                if (await _userManager.FindByNameAsync(username) != null)
                {
                    var result = await _userManager.GetUsersInRoleAsync(Roles.Programmer);
                    return Ok(result);
                }
                return BadRequest("User NULL");
            }
            catch (Exception ex)
            {
                return BadRequest("BackEnd: " + ex.Message);
            }
        }
    }
}
