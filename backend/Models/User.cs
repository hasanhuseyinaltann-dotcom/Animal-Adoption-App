namespace backend.Models
{
  public class User
  {
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;

    /// <summary>Yaşadığı şehir (81 il).</summary>
    public string City { get; set; } = "İstanbul";

    /// <summary>Evde geçirilen süre: 1 = az, 2 = orta, 3 = çok.</summary>
    public int HomeTimeLevel { get; set; } = 2;

    public bool HasGarden { get; set; }

    /// <summary>Kullanıcı enerji seviyesi: 1 = sakin, 2 = orta, 3 = enerjik.</summary>
    public int ActivityLevel { get; set; } = 2;

    public bool IsAdmin { get; set; }
  }
}
