import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";

function Logo({ to = "/dashboard", className = "" }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2.5 group ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/25 transition group-hover:scale-105">
        <PawPrint size={20} strokeWidth={2.5} />
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-ink">
        Pati<span className="text-brand-600">Bul</span>
      </span>
    </Link>
  );
}

export default Logo;
