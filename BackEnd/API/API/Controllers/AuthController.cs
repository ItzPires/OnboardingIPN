using API.Database;
using API.DataModels;
using API.Models;
using API.Types;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public Context _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthController(
            Context context,
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginForm model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                if(user.isDeleted) return Unauthorized();

                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = GetToken(authClaims);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterForm model)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var userExists = await _userManager.FindByEmailAsync(model.Email);
                    if (userExists != null)
                        return StatusCode(StatusCodes.Status406NotAcceptable, new Response { Status = "Error", Message = "User already exists!" });

                    User newUser = new()
                    {
                        Email = model.Email,
                        UserName = model.Username
                    };

                    var result = await _userManager.CreateAsync(newUser, model.Password);
                    if (!result.Succeeded)
                        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = result.Errors.ToString() });

                    if (!await _roleManager.RoleExistsAsync(Roles.Manager))
                        await _roleManager.CreateAsync(new IdentityRole(Roles.Manager));
                    if (!await _roleManager.RoleExistsAsync(Roles.Programmer))
                        await _roleManager.CreateAsync(new IdentityRole(Roles.Programmer));

                    if (model.isManager)
                        await _userManager.AddToRoleAsync(newUser, Roles.Manager);
                    else
                        await _userManager.AddToRoleAsync(newUser, Roles.Programmer);

                    _context.Add(newUser);
                    transaction.Commit();

                    return Ok(new Response { Status = "Success", Message = "User created successfully!" });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return BadRequest(ex.ToString());
                }
            }
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
