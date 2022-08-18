using API.DataModels;
using API.Models;
using AutoMapper;
using Task = API.Models.Task;

namespace API.Database
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<Project, ProjectForm>().ReverseMap();
            CreateMap<Task, TaskForm>().ReverseMap();
            CreateMap<Task, TaskFormUpdate>().ReverseMap();
            CreateMap<Comment, CommentForm>().ReverseMap();

            //Output
            CreateMap<Task, TaskDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Project, ProjectDto>().ReverseMap();
        }
    }
}
