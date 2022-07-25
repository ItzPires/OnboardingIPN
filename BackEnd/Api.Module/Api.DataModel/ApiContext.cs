using Api.Classes.Models;
using System.Data.Entity;

namespace Api.DataModel
{
    public class ApiContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<Classes.Models.Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
    }
}