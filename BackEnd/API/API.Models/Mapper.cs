using API.Models.DataModels;
using API.Models.Models;
using TaskModel = API.Models.Models.Task;
using AutoMapper;


namespace API.Models
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<Project, ProjectForm>().ReverseMap();
            CreateMap<TaskModel, TaskForm>().ReverseMap();
            CreateMap<TaskModel, TaskFormUpdate>().ReverseMap();
        }
    }
}
