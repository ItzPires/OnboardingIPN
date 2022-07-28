using API.Database.Interfaces;
using API.Models.Models;
using AutoMapper;

namespace API.Database
{
    public class ProjectService : IProjectDb
    {

        private readonly ApiContext _context;
        //private readonly IMapper _mapper;

        public ProjectService (ApiContext context) //, IMapper mapper
        {
            _context = context;
            //_mapper = mapper;
        }

        /*
        public Models.Models.Project NewProject(Project projectModel, User user)
        {
            var dbTransaction = _context.Database.BeginTransaction();
            Models.Models.Project project = _mapper.Map<Models.Models.Project>(projectModel);

            project.Manager = user;
            _context.Projects.Add(project);
            _context.SaveChanges();
            dbTransaction.Commit();
            return project;
        }
        */

        public void NewProject(Project newProject)
        {
            _context.Projects.Add(newProject);
        }
    }
}
