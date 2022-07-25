using Api.Classes.Models;
using Api.DataModel;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.REST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApiContext _context;
        public UsersController(ApiContext context) => _context = context;

        [HttpPost]
        public async Task<IActionResult> Register(User user)
        {
            /*
             *  using (var context = new ApiContext()) {
                    context.Users.Add(adm);
                    context.SaveChanges();
                }
         
             */
            return Ok();
        }
    }
}
