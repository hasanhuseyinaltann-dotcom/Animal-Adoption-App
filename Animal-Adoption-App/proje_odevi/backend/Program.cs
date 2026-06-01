using backend.Data;
using backend.Models;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

builder.Services.AddSingleton<MatchingService>();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Data Source=animaladoption.db";

if (connectionString.Contains("Data Source=", StringComparison.OrdinalIgnoreCase)
    || connectionString.Contains(".db", StringComparison.OrdinalIgnoreCase))
{
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlite(connectionString));
}
else
{
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(connectionString));
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
    SeedData.Initialize(db);
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowAll");

app.MapControllers();

app.Run();

static class SeedData
{
    public const string AdminEmail = "admin@patibul.com";
    public const string AdminPassword = "Admin123!";

    public static void Initialize(ApplicationDbContext db)
    {
        EnsureAdminUser(db);

        if (db.Pets.Any()) return;

        db.Pets.AddRange(
            new Pet
            {
                Name = "Pamuk",
                Type = "Kedi",
                Age = 12,
                Description = "Sakin, sevecen yaşlı kedi. Sessiz ev ortamına uyumlu.",
                ImageUrl = "https://placehold.co/600x450/e8f5e9/166534?text=Pamuk",
                City = "İstanbul",
                EnergyLevel = 1,
                NeedsGarden = false
            },
            new Pet
            {
                Name = "Karabaş",
                Type = "Köpek",
                Age = 3,
                Description = "Enerjik, yürüyüş ve oyun seven genç köpek. Bahçeli ev ideal.",
                ImageUrl = "https://placehold.co/600x450/dcfce7/15803d?text=Karabaş",
                City = "İstanbul",
                EnergyLevel = 3,
                NeedsGarden = true
            },
            new Pet
            {
                Name = "Luna",
                Type = "Kedi",
                Age = 2,
                Description = "Orta enerjili, oyuncu kedi. Evde vakit geçirenlerle uyumlu.",
                ImageUrl = "https://placehold.co/600x450/fef3c7/ca8a04?text=Luna",
                City = "Ankara",
                EnergyLevel = 2,
                NeedsGarden = false
            },
            new Pet
            {
                Name = "Max",
                Type = "Köpek",
                Age = 5,
                Description = "Dengeli karakter, aile dostu. Orta tempolu yürüyüşler yeterli.",
                ImageUrl = "https://placehold.co/600x450/e0e7ff/4338ca?text=Max",
                City = "İzmir",
                EnergyLevel = 2,
                NeedsGarden = false
            }
        );
        db.SaveChanges();
    }

    static void EnsureAdminUser(ApplicationDbContext db)
    {
        var admin = db.Users.FirstOrDefault(u => u.Email == AdminEmail);
        if (admin == null)
        {
            db.Users.Add(new User
            {
                Name = "Yönetici",
                Email = AdminEmail,
                Password = AdminPassword,
                City = "İstanbul",
                HomeTimeLevel = 2,
                HasGarden = false,
                ActivityLevel = 2,
                IsAdmin = true
            });
            db.SaveChanges();
            return;
        }

        if (!admin.IsAdmin)
        {
            admin.IsAdmin = true;
            db.SaveChanges();
        }
    }
}
