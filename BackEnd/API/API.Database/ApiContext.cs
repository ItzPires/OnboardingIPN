using API.Models;
using System.Data.Entity;

namespace API.Database
{
    public class ApiContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
    }
}