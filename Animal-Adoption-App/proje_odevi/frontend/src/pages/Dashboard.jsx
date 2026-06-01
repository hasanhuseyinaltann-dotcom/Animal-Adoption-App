import { useState, useEffect } from "react";
import { Search, PawPrint, Sparkles } from "lucide-react";
import PageShell from "../components/PageShell";
import PetCard from "../components/PetCard";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPets = async () => {
    try {
      const response = await fetch("http://localhost:5081/api/pets");
      if (response.ok) {
        setPets(await response.json());
      }
    } catch (error) {
      console.error("İlanlar yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const categories = ["Hepsi", ...new Set(pets.map((pet) => pet.type).filter(Boolean))];

  const filteredPets = pets.filter((pet) => {
    const matchesCategory =
      selectedCategory === "Hepsi" ||
      pet.type?.toLowerCase() === selectedCategory.toLowerCase();
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      pet.name?.toLowerCase().includes(q) ||
      pet.description?.toLowerCase().includes(q) ||
      pet.type?.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-brand-100 bg-gradient-to-br from-brand-50 via-white to-warm-50">
        <div className="pointer-events-none absolute -right-16 top-8 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-warm-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
                <Sparkles size={14} />
                Sahiplenmeyi bekleyen dostlar
              </span>
              <h1 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Yeni <span className="text-gradient-brand">dostunu</span> bul
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Kedi, köpek ve daha fazlası — güvenilir ilanlarla hayatına sevgi kat.
              </p>
            </div>

            <div className="flex gap-6 rounded-2xl border border-brand-100 bg-white/80 p-5 shadow-soft backdrop-blur sm:gap-10">
              <div>
                <p className="font-display text-3xl font-bold text-brand-700">{pets.length}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Aktif ilan</p>
              </div>
              <div className="w-px bg-brand-100" />
              <div>
                <p className="font-display text-3xl font-bold text-warm-600">
                  {Math.max(categories.length - 1, 0)}
                </p>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Tür</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50"
            />
            <input
              type="search"
              placeholder="İsim veya tür ara…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-11"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                  selectedCategory === category
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                    : "border border-brand-100 bg-white text-muted hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-80 animate-pulse rounded-2xl bg-brand-100/50"
              />
            ))}
          </div>
        ) : filteredPets.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-200 bg-white py-20 text-center">
            <PawPrint size={48} className="mb-4 text-brand-300" />
            <h3 className="font-display text-xl font-bold text-ink">İlan bulunamadı</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Bu kriterlere uygun ilan yok. Farklı bir kategori seçin veya aramayı değiştirin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPets.map((pet, i) => (
              <div
                key={pet.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(i * 60, 300)}ms` }}
              >
                <PetCard pet={pet} />
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

export default Dashboard;
