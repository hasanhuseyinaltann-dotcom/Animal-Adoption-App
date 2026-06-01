using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    public AuthController(ApplicationDbContext context)
    {
      _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(User user)
    {
      _context.Users.Add(user);
      await _context.SaveChangesAsync();

      return Ok(new { message = "User created successfully" });
    }

    [HttpPost("login")]
    public IActionResult Login(LoginModel loginUser)
    {
      var user = _context.Users.FirstOrDefault(x =>
          x.Email == loginUser.Email &&
          x.Password == loginUser.Password);

      if (user == null)
      {
        return BadRequest(new
        {
          message = "Email veya şifre hatalı"
        });
      }

      return Ok(new
      {
        message = "Giriş başarılı",
        user.Name,
        user.Email
      });
    }
  }
}