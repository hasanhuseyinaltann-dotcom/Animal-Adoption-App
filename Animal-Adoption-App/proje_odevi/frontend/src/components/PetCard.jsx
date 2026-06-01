import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

function PetCard({ pet }) {
  const navigate = useNavigate();

  return (
    <article className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-brand-100/80 bg-white shadow-soft">
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
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-display text-xl font-bold text-ink group-hover:text-brand-700 transition-colors">
            {pet.name}
          </h3>
        </div>

        <p className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted">
          <Calendar size={14} className="text-brand-500" />
          {pet.age} yaşında
        </p>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
          {pet.description}
        </p>

        <button
          type="button"
          onClick={() => navigate(`/pet/${pet.id}`)}
          className="btn-primary w-full"
        >
          Detayları Gör
          <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}

export default PetCard;
