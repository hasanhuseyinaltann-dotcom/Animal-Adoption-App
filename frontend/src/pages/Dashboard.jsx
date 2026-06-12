import { useState, useEffect, useCallback } from "react";
import { Search, PawPrint, Sparkles, MapPin } from "lucide-react";
import PageShell from "../components/PageShell";
import PetCard from "../components/PetCard";
import RecommendedPetCard from "../components/RecommendedPetCard";
import { API_BASE } from "../config/api";
import { getUser } from "../utils/auth";
import { TURKISH_CITIES } from "../data/turkishCities";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recLoading, setRecLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");
  const [selectedCity, setSelectedCity] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [user] = useState(() => getUser());

  const fetchPets = useCallback(async () => {
    try {
      const params = selectedCity !== "Tümü" ? `?city=${encodeURIComponent(selectedCity)}` : "";
      const response = await fetch(`${API_BASE}/pets${params}`);
      if (response.ok) {
        setPets(await response.json());
      }
    } catch (error) {
      console.error("İlanlar yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCity]);

  const fetchRecommendations = useCallback(async () => {
    if (!user?.email) {
      setRecLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE}/recommendations?email=${encodeURIComponent(user.email)}&limit=6`
      );
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.items || []);
      }
    } catch (error) {
      console.error("Öneriler yüklenirken hata:", error);
    } finally {
      setRecLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    setLoading(true);
    fetchPets();
  }, [fetchPets]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

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
      pet.type?.toLowerCase().includes(q) ||
      pet.city?.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const recommendedIds = new Set(recommendations.map((r) => r.id));

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
                Kedi, köpek ve daha fazlası — yaşam tarzınıza göre kişiselleştirilmiş öneriler.
              </p>
              {user?.city && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-brand-700">
                  <MapPin size={14} />
                  Konumunuz: {user.city}
                </p>
              )}
            </div>

            <div className="flex gap-6 rounded-2xl border border-brand-100 bg-white/80 p-5 shadow-soft backdrop-blur sm:gap-10">
              <div>
                <p className="font-display text-3xl font-bold text-brand-700">{pets.length}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Aktif ilan</p>
              </div>
              <div className="w-px bg-brand-100" />
              <div>
                <p className="font-display text-3xl font-bold text-warm-600">
                  {recommendations.length}
                </p>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Size özel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {user && (
        <section className="border-b border-brand-100 bg-gradient-to-r from-brand-50/80 to-warm-50/50">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                  <Sparkles className="text-brand-600" size={28} />
                  Senin İçin En Uygun Dostlar
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Yaşam tarzınız, ev ortamınız ve konumunuza göre yapay zeka eşleştirmesi.
                </p>
              </div>
            </div>

            {recLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-80 animate-pulse rounded-2xl bg-brand-100/50" />
                ))}
              </div>
            ) : recommendations.length === 0 ? (
              <p className="rounded-xl border border-dashed border-brand-200 bg-white/80 px-4 py-8 text-center text-sm text-muted">
                Henüz öneri yok. Profilinizi güncelleyin veya yeni ilanlar eklendiğinde tekrar bakın.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((pet, i) => (
                  <div
                    key={pet.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${Math.min(i * 60, 300)}ms` }}
                  >
                    <RecommendedPetCard pet={pet} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50"
              />
              <input
                type="search"
                placeholder="İsim, tür veya şehir ara…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-11"
              />
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-brand-600" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="input-field max-w-[200px] py-2 text-sm"
              >
                <option value="Tümü">Tüm şehirler</option>
                {TURKISH_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
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
              Bu kriterlere uygun ilan yok. Farklı bir şehir veya kategori seçin.
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
                <PetCard pet={pet} highlighted={recommendedIds.has(pet.id)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

export default Dashboard;
