namespace backend.Models
{
    public class Pet
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!;
        public int Age { get; set; }
        public string Description { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;

        public string City { get; set; } = "İstanbul";

        /// <summary>Enerji: 1 = sakin/yaşlı, 2 = orta, 3 = çok enerjik.</summary>
        public int EnergyLevel { get; set; } = 2;

        /// <summary>Bahçe veya geniş alan gerektiriyor mu?</summary>
        public bool NeedsGarden { get; set; }
    }
}
