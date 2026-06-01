using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Services;

namespace backend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RecommendationsController : ControllerBase
  {
    private readonly ApplicationDbContext _context;
    private readonly MatchingService _matchingService;

    public RecommendationsController(ApplicationDbContext context, MatchingService matchingService)
    {
      _context = context;
      _matchingService = matchingService;
    }

    /// <summary>
    /// Giriş yapmış kullanıcıya özel eşleşme önerileri (yaşam tarzı + ilan özellikleri).
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetRecommendations([FromQuery] string email, [FromQuery] int limit = 6)
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

      var pets = await _context.Pets.ToListAsync();
      var recommendations = _matchingService.RankPets(pets, user, Math.Clamp(limit, 1, 20));

      return Ok(new
      {
        title = "Senin İçin En Uygun Dostlar",
        userCity = user.City,
        items = recommendations
      });
    }
  }
}
