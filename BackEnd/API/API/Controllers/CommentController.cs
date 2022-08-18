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
    public class CommentController : ControllerBase
    {

        public Context _context;
        private readonly IMapper _mapper;

        public CommentController(
            Context context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        /*
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
        */

        [HttpPost("Add")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> AddComment([FromBody] CommentForm model)
        {
            try
            {
                _context.Database.BeginTransaction();

                if (model == null) return BadRequest("Comment object is null");

                //var writter = _context.Users.SingleOrDefault(x => x.UserName == model.WriterUserName);
                //if (writter == null) return BadRequest("Is null");

                var task = _context.Tasks.SingleOrDefault(x => x.Id == model.TaskId);
                if (task == null) return BadRequest("Is null");

                var comment = _mapper.Map<Comment>(model);
                comment.Task = task;

                _context.Add(comment);
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
        /*
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                _context.Database.BeginTransaction();

                var deleteProject = _context.Projects.Find(id);

                if (deleteProject == null)
                {
                    _context.Database.CommitTransaction();
                    return NotFound("Project Dont Exist");
                }

                deleteProject.isDeleted = true;

                _context.Projects.Update(deleteProject);
                _context.SaveChanges();

                _context.Database.CommitTransaction();

                return Ok();
            }
            catch (Exception ex)
            {
                _context.Database.RollbackTransaction();
                return BadRequest(ex.ToString());
            }
        }*/

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetCommentsByTask(int id)
        {
            try
            {
                var comments = _context.Comments.Include(p => p.Writer).Where(x => x.isDeleted == false).Where(x => x.Task.Id == id);
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
        /*
        [HttpPut("Update/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> UpdateProject([FromBody] ProjectForm model, int id)
        {
            try
            {
                _context.Database.BeginTransaction();

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
        */
    }
}
