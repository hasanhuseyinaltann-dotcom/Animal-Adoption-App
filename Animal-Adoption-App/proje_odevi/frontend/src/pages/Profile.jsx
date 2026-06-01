import { useState, useEffect } from "react";
import { PlusCircle, Trash2, ImageIcon, PawPrint } from "lucide-react";
import PageShell from "../components/PageShell";

function Profile() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    age: "",
    description: "",
    imageUrl: "",
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:5081/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          age: parseInt(formData.age, 10),
          description: formData.description,
          imageUrl: formData.imageUrl,
        }),
      });

      if (response.ok) {
        setFormData({ name: "", type: "", age: "", description: "", imageUrl: "" });
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
    if (!window.confirm("Bu ilanı kaldırmak istediğinize emin misiniz?")) return;

    try {
      const response = await fetch(`http://localhost:5081/api/pets/${id}`, {
        method: "DELETE",
      });
      if (response.ok) fetchPets();
      else alert("İlan kaldırılırken bir hata oluştu.");
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
            Yeni ilan yayınla veya mevcut ilanlarını yönet.
          </p>
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
              Yayınladığım ilanlar ({pets.length})
            </h2>

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
                <p className="mt-1 text-sm text-muted">
                  Soldaki formdan ilk ilanını oluştur.
                </p>
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
                      </div>
                      <p className="mt-1 text-sm text-muted line-clamp-2">
                        {pet.description}
                      </p>
                      <span className="mt-2 inline-block text-xs font-medium text-brand-600">
                        Aktif yayında
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(pet.id)}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={14} />
                      Kaldır
                    </button>
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
