using API.Models.DataModels;
using API.Models.Models;
using AutoMapper;


namespace API.Models
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<Project, ProjectForm>().ReverseMap();
        }
    }
}
