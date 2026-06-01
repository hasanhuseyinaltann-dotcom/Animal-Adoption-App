import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";
import { ENERGY_LABELS } from "../data/turkishCities";

function RecommendedPetCard({ pet }) {
  const navigate = useNavigate();

  return (
    <article className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border-2 border-brand-200 bg-gradient-to-b from-brand-50/80 to-white shadow-card">
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-bold text-white shadow-md">
        <Sparkles size={12} />
        %{pet.matchScore} uyum
      </div>

      <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
        <img
          src={pet.imageUrl || "https://placehold.co/600x450/e8f5e9/166534?text=PatiBul"}
          alt={pet.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 shadow-sm backdrop-blur">
          {pet.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold text-ink group-hover:text-brand-700 transition-colors">
          {pet.name}
        </h3>

        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted">
          <Calendar size={14} className="text-brand-500" />
          {pet.age} yaşında · {ENERGY_LABELS[pet.energyLevel] || "Orta"}
        </p>

        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
          <MapPin size={14} className="text-brand-500" />
          {pet.city}
        </p>

        <p className="mt-3 rounded-lg bg-brand-100/60 px-3 py-2 text-xs leading-relaxed text-brand-900">
          {pet.matchReason}
        </p>

        <button
          type="button"
          onClick={() => navigate(`/pet/${pet.id}`)}
          className="btn-primary mt-4 w-full"
        >
          Detayları Gör
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

export default RecommendedPetCard;
