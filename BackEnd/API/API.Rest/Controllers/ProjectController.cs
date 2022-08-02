using API.Database;
using API.Models.DataModels;
using API.Models.Models;
using API.Models.Types;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Rest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {

        public ApiContext _context;
        private readonly IMapper _mapper;

        public ProjectController(
            ApiContext context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("All")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public List<Project> GetProjects()
        {
            return _context.Projects.ToList();
        }

        [HttpGet("GetManagerProjects")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public List<Project> GetProjectsPerManager()
        {
            string username = User.Identity.Name;
            return _context.Projects.Where(x => x.Manager.UserName == username).ToList();
        }

        [HttpPost("Add")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public IActionResult AddProject([FromBody] ProjectForm model)
        {
            try
            {
                _context.Database.BeginTransaction();

                if (model == null) return BadRequest("Project object is null");

                string username = User.Identity.Name;
                var user = _context.Users.SingleOrDefault(x => x.UserName == username);
                if (user == null) return BadRequest("Is null");

                var project = _mapper.Map<Project>(model);
                project.Manager = user;

                _context.Add(project);
                _context.SaveChanges();

                _context.Database.CommitTransaction();

                return Ok();
            }
            catch (Exception ex)
            {
                _context.Database.RollbackTransaction();
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                _context.Database.BeginTransaction();

                var deleteProject = _context.Projects.Find(id);

                if(deleteProject == null)
                {
                    _context.Database.CommitTransaction();
                    return NotFound("Project Dont Exist");
                }

                _context.Projects.Remove(deleteProject);
                _context.SaveChanges();

                _context.Database.CommitTransaction();

                return Ok();
            }
            catch (Exception ex)
            {
                _context.Database.RollbackTransaction();
                return BadRequest(ex.ToString());
            }
        }
    }
}
