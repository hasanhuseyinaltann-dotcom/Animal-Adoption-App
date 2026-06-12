namespace backend.Models
{
  public class RegisterRequest
  {
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string City { get; set; } = "İstanbul";
    public int HomeTimeLevel { get; set; } = 2;
    public bool HasGarden { get; set; }
    public int ActivityLevel { get; set; } = 2;
  }
}
