namespace backend.Models
{
    public class Pet
    {
        public int Id { get; set; }
        
        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!; // Kedi, Köpek vb.
        public int Age { get; set; }
        public string Description { get; set; } = null!;
        public string ImageUrl { get; set; } = null!; // Fotoğraf linki için
    }
}