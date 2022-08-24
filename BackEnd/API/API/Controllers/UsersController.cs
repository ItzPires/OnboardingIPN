using API.Database;
using API.Models.Dto;
using API.Models.Models;
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
        public Context _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UsersController(
            Context context,
            UserManager<User> userManager,
           IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("Programmer")]
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

        [HttpGet("Stats")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetMyStats()
        {
            try
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                int toStart = _context.Tasks.Where(x => x.isDeleted == false && x.Project.isDeleted == false && x.ProgrammerId == user.Id && x.State == States.ToStart).Count();
                int inWork = _context.Tasks.Where(x => x.isDeleted == false && x.Project.isDeleted == false && x.ProgrammerId == user.Id && x.State == States.InWork).Count();
                int done = _context.Tasks.Where(x => x.isDeleted == false && x.Project.isDeleted == false && x.ProgrammerId == user.Id && x.State == States.Done).Count();

                return Ok(new StatsResponse { toStart = toStart, inWork = inWork, done = done });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
