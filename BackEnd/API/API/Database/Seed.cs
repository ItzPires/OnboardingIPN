using API.DataModels;
using API.Models;
using API.Types;
using Microsoft.AspNetCore.Identity;
using Task = API.Models.Task;

namespace API.Database
{
    public class Seed
    {
        public static async System.Threading.Tasks.Task SeedDataAsync (UserManager<User> _userManager, RoleManager<IdentityRole> _roleManager, Context _context)
        {
            try
            {
                //Users
                User manager = new()
                {
                    UserName = "manager",
                    Email = "manager@ipn.pt",
                    isDeleted = false
                };

                User programmerOne = new()
                {
                    UserName = "programmerOne",
                    Email = "programmerOne@ipn.pt",
                    isDeleted = false
                };

                User programmerTwo = new()
                {
                    UserName = "programmerTwo",
                    Email = "programmerTwo@ipn.pt",
                    isDeleted = false
                };

                //add roles
                if (!await _roleManager.RoleExistsAsync(Roles.Manager))
                    await _roleManager.CreateAsync(new IdentityRole(Roles.Manager));
                if (!await _roleManager.RoleExistsAsync(Roles.Programmer))
                    await _roleManager.CreateAsync(new IdentityRole(Roles.Programmer));

                //add users
                if (await _userManager.FindByEmailAsync("manager@ipn.pt") == null)
                {
                    await _userManager.CreateAsync(manager, "Password1.");
                    await _userManager.AddToRoleAsync(manager, Roles.Manager);
                }

                if (await _userManager.FindByEmailAsync("programmerOne@ipn.pt") == null)
                {
                    await _userManager.CreateAsync(programmerOne, "Password1.");
                    await _userManager.AddToRoleAsync(programmerOne, Roles.Programmer);
                }

                if (await _userManager.FindByEmailAsync("programmerTwo@ipn.pt") == null)
                {
                    await _userManager.CreateAsync(programmerTwo, "Password1.");
                    await _userManager.AddToRoleAsync(programmerTwo, Roles.Programmer);
                }

                //Projects
                Project projectOne = new()
                {
                    Name = "Desafio OnBoarding",
                    Budget = 0,
                    State = 0,
                    Manager = manager,
                    isDeleted = false
                };

                Project projectTwo = new()
                {
                    Name = "Casa de Apostas - Site",
                    Budget = 0,
                    State = 0,
                    Manager = manager,
                    isDeleted = false
                };

                if(_context.Projects.SingleOrDefault(x => x.Name == "Desafio OnBoarding") == null)
                {
                    _context.Add(projectOne);
                }
                if (_context.Projects.SingleOrDefault(x => x.Name == "Casa de Apostas - Site") == null)
                {
                    _context.Add(projectTwo);
                }

                //Tasks
                Task taskOne = new()
                {
                    Name = "BackEnd",
                    Deadline = new DateTime(2022, 08, 30, 23, 59, 59),
                    State = 0,
                    ProjectId = 1,
                    Project = projectOne,
                    Programmer = programmerOne,
                    isDeleted = false
                };

                Task taskTwo = new()
                {
                    Name = "FrontEnd",
                    Deadline = new DateTime(2022, 08, 31, 23, 59, 59),
                    State = 0,
                    ProjectId = 1,
                    Project = projectOne,
                    Programmer = programmerTwo,
                    isDeleted = false
                };

                Task taskThree = new()
                {
                    Name = "Api - Get Dados",
                    Deadline = new DateTime(2022, 09, 30, 23, 59, 59),
                    State = 0,
                    ProjectId = 2,
                    Project = projectTwo,
                    Programmer = programmerTwo,
                    isDeleted = false
                };

                Task taskFour = new()
                {
                    Name = "FrontEnd - Html",
                    Deadline = new DateTime(2022, 08, 31, 23, 59, 59),
                    State = 0,
                    ProjectId = 1,
                    Project = projectTwo,
                    Programmer = programmerOne,
                    isDeleted = false
                };

                if (_context.Tasks.SingleOrDefault(x => x.Name == "BackEnd") == null)
                {
                    _context.Add(taskOne);
                }
                if (_context.Tasks.SingleOrDefault(x => x.Name == "FrontEnd") == null)
                {
                    _context.Add(taskTwo);
                }
                if (_context.Tasks.SingleOrDefault(x => x.Name == "Api - Get Dados") == null)
                {
                    _context.Add(taskThree);
                }
                if (_context.Tasks.SingleOrDefault(x => x.Name == "FrontEnd - Html") == null)
                {
                    _context.Add(taskFour);
                }
                
                _context.SaveChanges();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return;
            }
        }
    }
}
