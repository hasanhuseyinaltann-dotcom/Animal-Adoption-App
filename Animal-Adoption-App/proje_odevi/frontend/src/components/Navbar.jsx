import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutGrid, UserCircle, LogOut } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { to: "/dashboard", label: "İlanlar", icon: LayoutGrid },
  { to: "/profile", label: "Profil & İlan Ver", icon: UserCircle },
];

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(to + "/");
            return (
              <Link
                key={to}
                to={to}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-muted hover:bg-brand-50/60 hover:text-brand-700"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 sm:text-sm"
        >
          <LogOut size={15} />
          <span className="hidden sm:inline">Çıkış</span>
        </button>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-brand-50 px-4 py-2 sm:hidden">
        {navLinks.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
                active ? "bg-brand-100 text-brand-800" : "text-muted"
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default Navbar;
