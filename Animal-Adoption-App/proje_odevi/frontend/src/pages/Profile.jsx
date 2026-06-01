import { useState, useEffect } from "react";
import { PlusCircle, Trash2, ImageIcon, PawPrint, User, Save } from "lucide-react";
import PageShell from "../components/PageShell";
import CitySelect from "../components/CitySelect";
import { API_BASE } from "../config/api";
import { getUser, saveUser, isAdmin } from "../utils/auth";
import { HOME_TIME_OPTIONS, ACTIVITY_OPTIONS, ENERGY_LABELS } from "../data/turkishCities";

function Profile() {
  const storedUser = getUser();
  const userIsAdmin = isAdmin(storedUser);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [lifestyle, setLifestyle] = useState({
    city: storedUser?.city || "İstanbul",
    homeTimeLevel: storedUser?.homeTimeLevel ?? 2,
    hasGarden: storedUser?.hasGarden ?? false,
    activityLevel: storedUser?.activityLevel ?? 2,
  });
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    age: "",
    description: "",
    imageUrl: "",
    city: storedUser?.city || "İstanbul",
    energyLevel: 2,
    needsGarden: false,
  });

  const fetchPets = async () => {
    try {
      const response = await fetch(`${API_BASE}/pets`);
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
    if (!storedUser?.email) return;

    const loadProfile = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/users/profile?email=${encodeURIComponent(storedUser.email)}`
        );
        if (res.ok) {
          const data = await res.json();
          setLifestyle({
            city: data.city,
            homeTimeLevel: data.homeTimeLevel,
            hasGarden: data.hasGarden,
            activityLevel: data.activityLevel,
          });
          setFormData((prev) => ({ ...prev, city: data.city }));
          saveUser({ ...storedUser, ...data });
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : name === "energyLevel" ? Number(value) : value,
    });
  };

  const handleLifestyleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLifestyle({
      ...lifestyle,
      [name]: type === "checkbox" ? checked : type === "radio" ? Number(value) : value,
    });
  };

  const saveLifestyle = async (e) => {
    e.preventDefault();
    if (!storedUser?.email) {
      alert("Yaşam tarzı kaydı için giriş yapmalısınız.");
      return;
    }
    setProfileSaving(true);
    try {
      const res = await fetch(
        `${API_BASE}/users/profile?email=${encodeURIComponent(storedUser.email)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lifestyle),
        }
      );
      if (res.ok) {
        saveUser({ ...storedUser, ...lifestyle });
        alert("Yaşam tarzı profiliniz güncellendi. Öneriler buna göre yenilenecek.");
      } else {
        alert("Profil güncellenemedi.");
      }
    } catch {
      alert("Bağlantı hatası.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/pets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          age: parseInt(formData.age, 10),
          description: formData.description,
          imageUrl: formData.imageUrl,
          city: formData.city,
          energyLevel: formData.energyLevel,
          needsGarden: formData.needsGarden,
        }),
      });

      if (response.ok) {
        setFormData({
          name: "",
          type: "",
          age: "",
          description: "",
          imageUrl: "",
          city: lifestyle.city,
          energyLevel: 2,
          needsGarden: false,
        });
        fetchPets();
      } else {
        alert("İlan eklenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Bağlantı hatası:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!userIsAdmin) {
      alert("İlan silme yetkisi yalnızca yöneticilerde.");
      return;
    }
    if (!window.confirm("Bu ilanı kaldırmak istediğinize emin misiniz?")) return;

    try {
      const response = await fetch(
        `${API_BASE}/pets/${id}?email=${encodeURIComponent(storedUser.email)}`,
        { method: "DELETE" }
      );
      if (response.ok) fetchPets();
      else {
        const data = await response.json().catch(() => ({}));
        alert(data.message || "İlan kaldırılırken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Profilim
          </h1>
          <p className="mt-2 text-muted">
            Yaşam tarzı bilgilerinizi güncelleyin, yeni ilan yayınlayın.
          </p>
        </div>

        <div className="mb-10 rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-ink">
            <User size={22} className="text-brand-600" />
            Yaşam tarzı profili
          </h2>
          <p className="mb-6 text-sm text-muted">
            Bu bilgiler &quot;Senin İçin En Uygun Dostlar&quot; önerilerinde kullanılır.
          </p>
          <form onSubmit={saveLifestyle} className="grid gap-6 lg:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Şehir
              </label>
              <CitySelect
                value={lifestyle.city}
                onChange={handleLifestyleChange}
                name="city"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
                Evde geçirilen süre
              </label>
              <div className="space-y-2">
                {HOME_TIME_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-start gap-2 rounded-lg border p-2.5 text-sm ${
                      lifestyle.homeTimeLevel === opt.value
                        ? "border-brand-400 bg-brand-50"
                        : "border-brand-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="homeTimeLevel"
                      value={opt.value}
                      checked={lifestyle.homeTimeLevel === opt.value}
                      onChange={handleLifestyleChange}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm lg:col-span-2">
              <input
                type="checkbox"
                name="hasGarden"
                checked={lifestyle.hasGarden}
                onChange={handleLifestyleChange}
              />
              Evimde bahçe veya geniş açık alan var
            </label>
            <div className="lg:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
                Aktivite seviyesi
              </label>
              <div className="space-y-2">
                {ACTIVITY_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-start gap-2 rounded-lg border p-2.5 text-sm ${
                      lifestyle.activityLevel === opt.value
                        ? "border-brand-400 bg-brand-50"
                        : "border-brand-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="activityLevel"
                      value={opt.value}
                      checked={lifestyle.activityLevel === opt.value}
                      onChange={handleLifestyleChange}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" disabled={profileSaving} className="btn-primary lg:col-span-2">
              <Save size={18} />
              {profileSaving ? "Kaydediliyor…" : "Profili Kaydet"}
            </button>
          </form>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft lg:sticky lg:top-24 lg:self-start">
            <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold text-ink">
              <PlusCircle size={22} className="text-brand-600" />
              Yeni ilan
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                  Hayvanın adı
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                  Tür (Kedi, Köpek…)
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                  Yaş
                </label>
                <input
                  type="number"
                  name="age"
                  min="0"
                  value={formData.age}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                  Şehir
                </label>
                <CitySelect value={formData.city} onChange={handleChange} name="city" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                  Enerji seviyesi
                </label>
                <select
                  name="energyLevel"
                  value={formData.energyLevel}
                  onChange={handleChange}
                  className="input-field"
                >
                  {[1, 2, 3].map((n) => (
                    <option key={n} value={n}>
                      {ENERGY_LABELS[n]}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="needsGarden"
                  checked={formData.needsGarden}
                  onChange={handleChange}
                />
                Bahçe / geniş alan gerektirir
              </label>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                  Fotoğraf URL
                </label>
                <div className="relative">
                  <ImageIcon
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50"
                  />
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="input-field pl-11"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                  Açıklama
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="input-field resize-none"
                  required
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? "Yayınlanıyor…" : "İlanı Yayınla"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <h2 className="mb-6 font-display text-xl font-bold text-ink">
              Tüm ilanlar ({pets.length})
            </h2>
            {userIsAdmin && (
              <p className="mb-4 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-800">
                Yönetici olarak ilanları kaldırabilirsiniz.
              </p>
            )}

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-24 animate-pulse rounded-2xl bg-brand-100/50" />
                ))}
              </div>
            ) : pets.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-brand-200 bg-white py-16 text-center">
                <PawPrint size={40} className="mx-auto mb-3 text-brand-300" />
                <p className="font-medium text-ink">Henüz ilan yok</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pets.map((pet) => (
                  <article
                    key={pet.id}
                    className="flex gap-4 rounded-2xl border border-brand-100 bg-white p-4 shadow-soft transition hover:shadow-card sm:items-center"
                  >
                    <img
                      src={pet.imageUrl || "https://placehold.co/120"}
                      alt={pet.name}
                      className="h-24 w-24 shrink-0 rounded-xl object-cover bg-brand-50 sm:h-20 sm:w-20"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg font-bold text-ink">
                          {pet.name}
                        </h3>
                        <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold uppercase text-brand-800">
                          {pet.type}
                        </span>
                        {pet.city && (
                          <span className="text-xs text-muted">{pet.city}</span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted line-clamp-2">
                        {pet.description}
                      </p>
                      <span className="mt-2 inline-block text-xs font-medium text-brand-600">
                        {ENERGY_LABELS[pet.energyLevel] || "Orta"} · Aktif
                      </span>
                    </div>
                    {userIsAdmin && (
                      <button
                        type="button"
                        onClick={() => handleDelete(pet.id)}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={14} />
                        Kaldır
                      </button>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default Profile;
