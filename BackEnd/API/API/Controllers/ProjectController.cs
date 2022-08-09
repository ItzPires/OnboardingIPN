using API.Database;
using API.DataModels;
using API.Models;
using API.Types;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {

        public Context _context;
        private readonly IMapper _mapper;

        public ProjectController(
            Context context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("All")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public ProjectDto[] GetProjects()
        {
            var projects = _context.Projects.Include(p => p.Manager).ToList();
            return _mapper.Map<ProjectDto[]>(projects);
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

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public ProjectDto GetProject(int id)
        {
            var project = _context.Projects.Include(p => p.Manager).SingleOrDefault(x => x.Id == id);
            return _mapper.Map<ProjectDto>(project);
        }

        [HttpPut("Update/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> UpdateTasks([FromBody] ProjectForm model, int id)
        {
            try
            {
                _context.Database.BeginTransaction();

                //verificacoes
                if (model == null) return BadRequest("Is null");

                var oldTask = _context.Projects.SingleOrDefault(x => x.Id == id);
                if (oldTask == null) return BadRequest("Is null");

                var newTask = _mapper.Map<Project>(model);

                oldTask.Name = newTask.Name;
                oldTask.Budget = newTask.Budget;
                oldTask.State = newTask.State;

                _context.Projects.Update(oldTask);
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

        [HttpGet("Stats")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public int GetStats()
        {
            return _context.Projects.ToList().Count;
        }
    }
}
