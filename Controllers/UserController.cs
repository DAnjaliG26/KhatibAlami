using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace KhatibAlami.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
      
        [AllowAnonymous]
        [HttpGet("authenticate")]
        public IActionResult Authenticate(int id)
        {
            List<User> users = GetUsers();
            var user = users.SingleOrDefault(x => x.Id == id);
            if (user == null)
                return BadRequest(new { message = "Unauthorized" });
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = System.Text.Encoding.ASCII.GetBytes("secret token key for demo project");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Role, user.Roles)

                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
         
            return Ok(user);
        }

        [Authorize(Roles = ("Admin"))]
        [HttpGet("AdminRole")]
        public IActionResult UserwithAdminRole()
        {
            var users = GetUsers();
            return Ok(users);
        }

        [Authorize(Roles = ("Public"))]
        [HttpGet("PublicRole")]
        public IActionResult UserwithPublicRole()
        {
            var users = GetUsers();
            var user = users.SingleOrDefault(x => x.Roles =="Public");
            return Ok(users);
        }

        //created dummy custom user list
        public List<User> GetUsers()
        {
            List<User> DummyUsers = new List<User>() {
                new User
                {
                    Id = 1,
                    Name = "Anjali",
                    Roles = "Public"
                },
                new User
                {
                    Id = 2,
                    Name = "Admin",
                    Roles = "Admin"
                }
                };
            return DummyUsers;
        }
    }
}
