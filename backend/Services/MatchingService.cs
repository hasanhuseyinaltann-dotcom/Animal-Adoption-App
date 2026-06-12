using backend.Models;

namespace backend.Services
{
  /// <summary>
  /// Kullanıcı yaşam tarzı profili ile hayvan özelliklerini ağırlıklı puanlayarak eşleştirir.
  /// </summary>
  public class MatchingService
  {
    public PetRecommendationDto ToRecommendation(Pet pet, User user)
    {
      var (score, reason) = CalculateMatch(pet, user);
      return new PetRecommendationDto
      {
        Id = pet.Id,
        Name = pet.Name,
        Type = pet.Type,
        Age = pet.Age,
        Description = pet.Description,
        ImageUrl = pet.ImageUrl,
        City = pet.City,
        EnergyLevel = pet.EnergyLevel,
        NeedsGarden = pet.NeedsGarden,
        MatchScore = score,
        MatchReason = reason
      };
    }

    public static (int Score, string Reason) CalculateMatch(Pet pet, User user)
    {
      var reasons = new List<string>();
      double score = 50;

      var energyDiff = Math.Abs(user.ActivityLevel - pet.EnergyLevel);
      if (energyDiff == 0)
      {
        score += 28;
        reasons.Add("enerji seviyeniz uyumlu");
      }
      else if (energyDiff == 1)
      {
        score += 14;
        reasons.Add("enerji seviyeniz yakın");
      }
      else
      {
        score -= 12;
      }

      if (user.HomeTimeLevel >= 2 && pet.EnergyLevel >= 3)
      {
        score += 12;
        reasons.Add("evde vakit geçirmeniz aktif dostlar için ideal");
      }
      else if (user.HomeTimeLevel == 1 && pet.EnergyLevel == 3)
      {
        score -= 18;
      }

      if (pet.Age >= 8 && user.ActivityLevel == 1)
      {
        score += 15;
        reasons.Add("sakin yaşam tarzınız yaşlı dostlarla uyumlu");
      }
      else if (pet.Age >= 8 && user.ActivityLevel == 3)
      {
        score -= 8;
      }

      if (pet.NeedsGarden)
      {
        if (user.HasGarden)
        {
          score += 22;
          reasons.Add("bahçeniz bu dost için uygun");
        }
        else
        {
          score -= 25;
        }
      }
      else if (user.HasGarden && pet.EnergyLevel >= 2)
      {
        score += 6;
      }

      if (string.Equals(pet.City, user.City, StringComparison.OrdinalIgnoreCase))
      {
        score += 18;
        reasons.Add($"aynı şehirdesiniz ({pet.City})");
      }

      if (pet.EnergyLevel == 1 && user.HomeTimeLevel <= 2)
      {
        score += 8;
        reasons.Add("sakin bir dost ev hayatına uygun");
      }

      score = Math.Clamp(score, 0, 100);
      var reasonText = reasons.Count > 0
        ? string.Join(", ", reasons.Take(2)) + "."
        : "Profilinize göre genel uyum.";

      return ((int)Math.Round(score), reasonText);
    }

    public List<PetRecommendationDto> RankPets(IEnumerable<Pet> pets, User user, int limit = 6)
    {
      return pets
        .Select(p => ToRecommendation(p, user))
        .OrderByDescending(r => r.MatchScore)
        .Take(limit)
        .ToList();
    }
  }
}
