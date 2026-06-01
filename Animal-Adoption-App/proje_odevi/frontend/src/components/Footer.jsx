import { Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-100 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} PatiBul — Her pati bir yuva hak eder.
        </p>
        <p className="inline-flex items-center gap-1.5 text-sm text-brand-600">
          Sevgiyle yapıldı <Heart size={14} className="fill-warm-500 text-warm-500" />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
