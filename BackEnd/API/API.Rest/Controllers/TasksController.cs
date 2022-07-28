﻿using API.Database;
using API.Models.Types;
using TaskModel = API.Models.Models.Task;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Models.DataModels;

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
        public List<TaskModel> GetProjects()
        {
            return _context.Tasks.ToList();
        }

        [HttpGet("GetProgrammerTasks")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Programmer)]
        public List<TaskModel> GetProjectsPerManager()
        {
            string username = User.Identity.Name;
            return _context.Tasks.Where(x => x.Programmer.UserName == username).ToList();
        }

        [HttpPost("Add")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = Roles.Manager)]
        public async Task<IActionResult> AddProject([FromBody] TaskForm model)
        {
            try
            {
                _context.Database.BeginTransaction();

                if (model == null) return BadRequest("Is null");

                var newTask = _mapper.Map<TaskModel>(model);

                var project = _context.Projects.Find(model.IdProject);
                var programmer = _context.Users.SingleOrDefault(x => x.UserName == model.UsernameProgrammer);

                newTask.Project = project;
                newTask.Programmer = programmer;

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
    }
}
