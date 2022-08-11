using API.Database;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Types;
using API.DataModels;
using Task = API.Models.Task;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {

        public Context _context;
        private readonly IMapper _mapper;

        public TasksController(
            Context context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("All")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> GetTasks()
        {
            try
            {
                var tasks = _context.Tasks.Include(t => t.Programmer).Include(t => t.Project).Where(x => x.isDeleted == false).Where(x => x.Project.isDeleted == false).ToList();
                return Ok(_mapper.Map<TaskDto[]>(tasks));
            }
            catch (Exception ex)
            {
                return BadRequest("BackEnd: " + ex.Message);
            }
        }

        [HttpGet("GetProgrammerTasks/{username}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> GetTasksPerProgrammer(string username)
        {
            try
            {
                var tasks = _context.Tasks.Where(x => x.Programmer.UserName == username).Include(t => t.Programmer).Include(t => t.Project).Where(x => x.isDeleted == false).Where(x => x.Project.isDeleted == false).ToList();
                return Ok(_mapper.Map<TaskDto[]>(tasks));
            }
            catch (Exception ex)
            {
                return BadRequest("BackEnd: " + ex.Message);
            }
        }

        [HttpGet("GetMyTasks")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Programmer)]
        public async Task<IActionResult> GetMyTasks()
        {
            try
            {
                string username = User.Identity.Name;
                var tasks = _context.Tasks.Where(x => x.Programmer.UserName == username).Include(t => t.Project).Where(x => x.isDeleted == false).Where(x => x.Project.isDeleted == false).ToList();
                return Ok(_mapper.Map<TaskDto[]>(tasks));
            }
            catch (Exception ex)
            {
                return BadRequest("BackEnd: " + ex.Message);
            }
        }

        [HttpGet("GetProjectTasks/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> GetProjectTasks(int id)
        {
            try
            {
                var tasks = _context.Tasks.Where(x => x.Project.Id == id).Include(t => t.Programmer).Include(t => t.Project).Where(x => x.isDeleted == false).ToList();
                return Ok(_mapper.Map<TaskDto[]>(tasks));
            }
            catch (Exception ex)
            {
                return BadRequest("BackEnd: " + ex.Message);
            }
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetTAskById(int id)
        {
            try
            {
                var task = _context.Tasks.Include(t => t.Programmer).Include(t => t.Project).Where(x => x.isDeleted == false).Where(x => x.Project.isDeleted == false).SingleOrDefault(x => x.Id == id);
                return Ok(_mapper.Map<TaskDto>(task));
            }
            catch (Exception ex)
            {
                return BadRequest("BackEnd: " + ex.Message);
            }
        }

        [HttpPost("Add")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> AddTask([FromBody] TaskForm model)
        {
            try
            {
                _context.Database.BeginTransaction();

                if (model == null) return BadRequest("Is null");

                var newTask = _mapper.Map<Task>(model);

                var project = _context.Projects.Find(model.IdProject);
                var programmer = _context.Users.SingleOrDefault(x => x.UserName == model.UsernameProgrammer);

                if (project == null) return BadRequest("A Is null");
                if (programmer == null) return BadRequest("B Is null");

                newTask.Project = project;
                newTask.Programmer = programmer;
                //newTask.ProgrammerUserName = model.UsernameProgrammer;

                //todo - ver se ficou ou não
                _context.Add(newTask);
                _context.SaveChanges();

                _context.Database.CommitTransaction();

                return Ok();
            }
            catch (Exception ex)
            {
                _context.Database.RollbackTransaction();
                return BadRequest("BackEnd: " + ex.Message);
            }
        }

        [HttpPut("Update/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> UpdateTasks([FromBody] TaskFormUpdate model, int id)
        {
            try
            {
                _context.Database.BeginTransaction();

                //verificacoes
                if (model == null) return BadRequest("Is null");

                var oldTask = _context.Tasks.Where(x => x.isDeleted == false).Where(x => x.Project.isDeleted == false).SingleOrDefault(x => x.Id == id);
                if (oldTask == null) return BadRequest("Is null");

                var newTask = _mapper.Map<Task>(model);

                oldTask.Name = newTask.Name;
                oldTask.Deadline = newTask.Deadline;
                oldTask.State = newTask.State;

                _context.Tasks.Update(oldTask);
                _context.SaveChanges();

                _context.Database.CommitTransaction();

                return Ok();
            }
            catch (Exception ex)
            {
                _context.Database.RollbackTransaction();
                return BadRequest("BackEnd: " + ex.Message);
            }
        }
    }
}
