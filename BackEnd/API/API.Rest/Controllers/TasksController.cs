using API.Database;
using API.Models.Types;
using TaskModel = API.Models.Models.Task;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Models.DataModels;
using System.Data.Entity;

namespace API.Rest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {

        public ApiContext _context;
        private readonly IMapper _mapper;

        public TasksController(
            ApiContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("All")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public List<TaskModel> GetTasks()
        {
            var tasks =  _context.Tasks.Include(t => t.Programmer).ToList();
            return tasks;
        }

        [HttpGet("GetProgrammerTasks/{username}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public List<TaskModel> GetTasksPerProgrammer(string username)
        {
            return _context.Tasks.Where(x => x.Programmer.UserName == username).ToList();
        }

        [HttpGet("GetProjectTasks/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public List<TaskModel> GetProjectTasks(int id)
        {
            return _context.Tasks.Where(x => x.Project.Id == id).ToList();
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public TaskModel GetTAskById(int id)
        {
            return _context.Tasks.SingleOrDefault(x => x.Id == id);
        }

        [HttpPost("Add")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> AddTask([FromBody] TaskForm model)
        {
            try
            {
                _context.Database.BeginTransaction();

                if (model == null) return BadRequest("Is null");

                var newTask = _mapper.Map<TaskModel>(model);

                var project = _context.Projects.Find(model.IdProject);
                var programmer = _context.Users.SingleOrDefault(x => x.UserName == model.UsernameProgrammer);

                if(project == null) return BadRequest("A Is null");
                if(programmer == null) return BadRequest("B Is null");

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
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut("Update/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> UpdateTasks([FromBody] TaskFormUpdate model, int id)
        {
            try
            {
                _context.Database.BeginTransaction();

                //verificacoes
                if (model == null) return BadRequest("Is null");

                var oldTask = _context.Tasks.SingleOrDefault(x => x.Id == id);
                if (oldTask == null) return BadRequest("Is null");

                var newTask = _mapper.Map<TaskModel>(model);

                

                //var project = _context.Projects.Find(model.IdProject);
                //var programmer = _context.Users.SingleOrDefault(x => x.UserName == model.UsernameProgrammer);

                //newTask.Project = project;
                //newTask.Programmer = programmer;

                _context.Tasks.Update(oldTask);
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
