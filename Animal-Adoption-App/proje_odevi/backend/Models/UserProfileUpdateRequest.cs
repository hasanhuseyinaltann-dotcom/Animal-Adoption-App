namespace backend.Models
{
  public class UserProfileUpdateRequest
  {
    public string City { get; set; } = null!;
    public int HomeTimeLevel { get; set; }
    public bool HasGarden { get; set; }
    public int ActivityLevel { get; set; }
  }
}
