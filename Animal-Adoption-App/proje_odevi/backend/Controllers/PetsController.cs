using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PetsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Tüm ilanları listeleme (GET: api/pets)
        [HttpGet]
        public async Task<IActionResult> GetPets()
        {
            var pets = await _context.Pets.ToListAsync();
            return Ok(pets);
        }

        // 2. Yeni ilan ekleme (POST: api/pets)
        [HttpPost]
        public async Task<IActionResult> CreatePet(Pet pet)
        {
            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();

            return Ok(new { message = "İlan başarıyla oluşturuldu", pet });
        }

        // 3. Tek bir ilanın detayını getirme (GET: api/pets/{id})
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPet(string id)
        {
            // Hem sayısal ID (int) hem de metinsel ID (Guid/string) durumlarını destekler
            var pet = await _context.Pets.FirstOrDefaultAsync(p => p.Id.ToString() == id);

            if (pet == null)
            {
                return NotFound(new { message = "İlan veritabanında bulunamadı!" });
            }

            return Ok(pet);
        }

        // 4. İlanı silme (DELETE: api/pets/{id})
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePet(string id)
        {
            var pet = await _context.Pets.FirstOrDefaultAsync(p => p.Id.ToString() == id);
            
            if (pet == null)
            {
                return NotFound(new { message = "İlan bulunamadı!" });
            }

            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();

            return Ok(new { message = "İlan başarıyla silindi." });
        }
    }
}