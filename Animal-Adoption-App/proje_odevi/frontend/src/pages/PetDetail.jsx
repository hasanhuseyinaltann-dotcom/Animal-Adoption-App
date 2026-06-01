import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Phone,
  MessageCircle,
  Loader2,
  Tag,
} from "lucide-react";
import PageShell from "../components/PageShell";

function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5081/api/pets/${id}`);
        if (response.ok) {
          setPet(await response.json());
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Detaylar yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetail();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="flex items-center gap-3 text-brand-700">
          <Loader2 size={28} className="animate-spin" />
          <span className="font-medium">İlan yükleniyor…</span>
        </div>
      </div>
    );
  }

  if (!pet) return null;

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand-700"
        >
          <ArrowLeft size={18} />
          Vitrine dön
        </button>

        <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative aspect-square bg-brand-50 lg:aspect-auto lg:min-h-[420px]">
              <img
                src={pet.imageUrl || "https://placehold.co/800x800/e8f5e9/166534?text=PatiBul"}
                alt={pet.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-1.5 text-sm font-bold text-brand-700 shadow-sm">
                <Tag size={14} />
                {pet.type}
              </span>
            </div>

            <div className="flex flex-col p-6 sm:p-10">
              <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
                {pet.name}
              </h1>

              <p className="mt-3 inline-flex items-center gap-2 text-muted">
                <Calendar size={18} className="text-brand-500" />
                <span>
                  <strong className="text-ink">{pet.age}</strong> yaşında
                </span>
              </p>

              <div className="mt-8 flex-1">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted">
                  Açıklama
                </h2>
                <p className="mt-3 whitespace-pre-line rounded-xl bg-brand-50/80 p-5 text-sm leading-relaxed text-ink/90">
                  {pet.description}
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-warm-50 p-6">
                <h3 className="font-display text-lg font-bold text-ink">
                  İletişime geç
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Sahiplenmek veya bilgi almak için aşağıdaki kanalları kullanın.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a href="tel:05555555555" className="btn-primary flex-1">
                    <Phone size={18} />
                    0555 555 55 55
                  </a>
                  <a
                    href="https://wa.me/905555555555"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary flex-1"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default PetDetail;
