using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    public UsersController(ApplicationDbContext context)
    {
      _context = context;
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile([FromQuery] string email)
    {
      if (string.IsNullOrWhiteSpace(email))
      {
        return BadRequest(new { message = "E-posta adresi gerekli." });
      }

      var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
      if (user == null)
      {
        return NotFound(new { message = "Kullanıcı bulunamadı." });
      }

      return Ok(new
      {
        user.Name,
        user.Email,
        user.City,
        user.HomeTimeLevel,
        user.HasGarden,
        user.ActivityLevel,
        user.IsAdmin
      });
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromQuery] string email, [FromBody] UserProfileUpdateRequest request)
    {
      if (string.IsNullOrWhiteSpace(email))
      {
        return BadRequest(new { message = "E-posta adresi gerekli." });
      }

      var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
      if (user == null)
      {
        return NotFound(new { message = "Kullanıcı bulunamadı." });
      }

      user.City = request.City;
      user.HomeTimeLevel = Math.Clamp(request.HomeTimeLevel, 1, 3);
      user.HasGarden = request.HasGarden;
      user.ActivityLevel = Math.Clamp(request.ActivityLevel, 1, 3);

      await _context.SaveChangesAsync();

      return Ok(new { message = "Profil güncellendi." });
    }
  }
}
