using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public async Task<IActionResult> Register(RegisterRequest request)
    {
      if (await _context.Users.AnyAsync(u => u.Email == request.Email))
      {
        return BadRequest(new { message = "Bu e-posta adresi zaten kayıtlı." });
      }

      var user = new User
      {
        Name = request.Name,
        Email = request.Email,
        Password = request.Password,
        City = request.City,
        HomeTimeLevel = Math.Clamp(request.HomeTimeLevel, 1, 3),
        HasGarden = request.HasGarden,
        ActivityLevel = Math.Clamp(request.ActivityLevel, 1, 3),
        IsAdmin = false
      };

      _context.Users.Add(user);
      await _context.SaveChangesAsync();

      return Ok(new
      {
        message = "Kayıt başarılı",
        user = new
        {
          user.Name,
          user.Email,
          user.City,
          user.HomeTimeLevel,
          user.HasGarden,
          user.ActivityLevel,
          user.IsAdmin
        }
      });
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
        user = new
        {
          user.Name,
          user.Email,
          user.City,
          user.HomeTimeLevel,
          user.HasGarden,
          user.ActivityLevel,
          user.IsAdmin
        }
      });
    }
  }
}
