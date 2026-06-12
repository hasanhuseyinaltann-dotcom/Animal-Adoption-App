import { PawPrint, Shield, Heart, Home } from "lucide-react";
import Logo from "./Logo";

const features = [
  { icon: Heart, text: "Güvenli ve şeffaf ilan sistemi" },
  { icon: Shield, text: "Kolay iletişim ve sahiplendirme" },
  { icon: Home, text: "Her dost için sıcak bir yuva" },
];

function AuthShell({ variant = "login", children, footer }) {
  const isLogin = variant === "login";

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 p-12 lg:flex">
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-warm-500/10 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10">
          <div className="mb-2 flex items-center gap-2 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <PawPrint size={22} />
            </span>
            <span className="font-display text-2xl font-bold">PatiBul</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-100">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-300" />
            {isLogin ? "Tekrar hoş geldin" : "Aramıza katıl"}
          </span>

          <h1 className="font-display text-4xl font-bold leading-tight text-white xl:text-5xl">
            {isLogin ? (
              <>
                Dostlarına
                <br />
                <span className="text-brand-200">kavuş.</span>
              </>
            ) : (
              <>
                Bir cana
                <br />
                <span className="text-brand-200">yuva ol.</span>
              </>
            )}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-brand-100/90">
            {isLogin
              ? "Sahiplenilmeyi bekleyen yüzlerce ilana göz at, hayatına yeni bir dost kat."
              : "Ücretsiz hesap oluştur, ilan ver veya hayalinizdeki evcil hayvanı bulun."}
          </p>

          <ul className="mt-10 space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-brand-50">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon size={16} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-sm text-brand-200/70">
          500+ mutlu sahiplendirme hikâyesi
        </p>

        <div className="pointer-events-none absolute bottom-8 right-8 select-none text-[140px] leading-none opacity-[0.07]">
          🐾
        </div>
      </aside>

      <div className="flex min-h-screen flex-col justify-center bg-canvas px-6 py-12 sm:px-12">
        <div className="mb-8 lg:hidden">
          <Logo to="/" />
        </div>

        <div className="mx-auto w-full max-w-md animate-fade-in-up">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
              {isLogin ? "Giriş" : "Kayıt"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink">
              {isLogin ? "Hesabına giriş yap" : "Hesap oluştur"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {isLogin
                ? "E-posta ve şifrenle devam et."
                : "Birkaç bilgiyle hemen başla."}
            </p>
          </div>

          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-card sm:p-8">
            {children}
          </div>

          {footer && <div className="mt-6 text-center text-sm text-muted">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export default AuthShell;
