namespace backend.Models
{
  public class PetRecommendationDto
  {
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Type { get; set; } = null!;
    public int Age { get; set; }
    public string Description { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public string City { get; set; } = null!;
    public int EnergyLevel { get; set; }
    public bool NeedsGarden { get; set; }
    public int MatchScore { get; set; }
    public string MatchReason { get; set; } = null!;
  }
}
