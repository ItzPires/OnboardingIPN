using API.Database;
using API.Models.Dto;
using API.Models.Models;
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
        public async Task<IActionResult> GetProjects()
        {
            try
            {
                var projects = _context.Projects.Include(p => p.Manager).Where(x => x.isDeleted == false).ToList();
                return Ok(_mapper.Map<ProjectDto[]>(projects));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Data);
            }
        }

        [HttpGet("GetManagerProjects")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> GetProjectsPerManager()
        {
            try
            {
                string username = User.Identity.Name;
                var projects = _context.Projects.Where(x => x.Manager.UserName == username).Where(x => x.isDeleted == false).ToList();
                return Ok(_mapper.Map<ProjectDto[]>(projects));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Data);
            }
        }

        [HttpPost("Add")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> AddProject([FromBody] ProjectForm model)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {

                    if (model == null) return BadRequest("Project object is null");

                    string username = User.Identity.Name;
                    var user = _context.Users.SingleOrDefault(x => x.UserName == username);
                    if (user == null) return BadRequest("Is null");

                    var project = _mapper.Map<Project>(model);
                    project.Manager = user;

                    _context.Add(project);
                    _context.SaveChanges();

                    transaction.Commit();

                    return Ok();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return BadRequest(ex.ToString());
                }
            }
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> DeleteProject(int id)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var deleteProject = _context.Projects.Find(id);

                    if (deleteProject == null)
                    {
                        transaction.Rollback();
                        return NotFound("Project Dont Exist");
                    }

                    deleteProject.isDeleted = true;

                    _context.Projects.Update(deleteProject);
                    _context.SaveChanges();

                    transaction.Commit();

                    return Ok();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return BadRequest(ex.ToString());
                }
            }
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> GetProject(int id)
        {
            try
            {
                var project = _context.Projects.Include(p => p.Manager).Where(x => x.isDeleted == false).SingleOrDefault(x => x.Id == id);
                return Ok(_mapper.Map<ProjectDto>(project));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut("Update/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> UpdateProject([FromBody] ProjectForm model, int id)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    //verificacoes
                    if (model == null) return BadRequest("Is null");

                    var oldTask = _context.Projects.Where(x => x.isDeleted == false).SingleOrDefault(x => x.Id == id);
                    if (oldTask == null) return BadRequest("Is null");

                    var newTask = _mapper.Map<Project>(model);

                    oldTask.Name = newTask.Name;
                    oldTask.Budget = newTask.Budget;
                    oldTask.State = newTask.State;

                    _context.Projects.Update(oldTask);
                    _context.SaveChanges();

                    transaction.Commit();

                    return Ok();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return BadRequest(ex.ToString());
                }
            }
        }

        [HttpGet("Stats")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public int GetStats()
        {
            return _context.Projects.ToList().Count;
        }

        /*
        [HttpGet("ProgessProjects")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public int GetProgessProjects()
        {
            var projects = _context.Projects.ToList();

            for(int i = 0; i < projects.Count; i++)
            {
                var total = _context.Tasks.Where(x => x.ProjectId == projects[i].Id).Count();
                var totalDone = _context.Tasks.Where(x => x.ProjectId == projects[i].Id && x.State == States.Done).Count();

                int progess = totalDone * 100 / total;

                var aa =
                {
                    "project": projects[i].Id,
                    "progess": progess
                };
            }
        }*/
    }
}
