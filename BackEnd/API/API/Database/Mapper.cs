using API.Models.Dto;
using API.Models.Models;
using AutoMapper;
using Task = API.Models.Models.Task;

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
