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

        [HttpPost("Add")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> AddComment([FromBody] CommentForm model)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    if (model == null) return BadRequest("Comment object is null");

                    //var writter = _context.Users.SingleOrDefault(x => x.UserName == model.WriterUserName);
                    //if (writter == null) return BadRequest("Is null");

                    var task = _context.Tasks.SingleOrDefault(x => x.Id == model.TaskId);
                    if (task == null) return BadRequest("Is null");

                    var comment = _mapper.Map<Comment>(model);
                    comment.Task = task;
                    comment.isDeleted = false;

                    _context.Add(comment);
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
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetCommentsByTask(int id)
        {
            try
            {
                var comments = _context.Comments.Include(p => p.Writer).Where(x => x.isDeleted == false && x.Task.Id == id).OrderBy(x => x.Date);
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
