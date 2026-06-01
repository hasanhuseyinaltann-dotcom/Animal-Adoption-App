import { useState } from "react";
import axios from "axios";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5081/api/auth/register", form);
      alert("Kayıt başarılı");
    } catch (err) {
      console.error(err);
      alert("Hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 font-sans bg-[#0f0e0a] selection:bg-amber-500/30"
      style={{ fontFamily: "'Georgia', serif" }}>

      {/* ════════════════════════════════
          SOL PANEL
      ════════════════════════════════ */}
      <div className="hidden lg:flex relative flex-col justify-between p-16 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1a1200 0%, #0f0e0a 40%, #0a0f0a 100%)"
        }}>

        {/* Dekor ışıkları */}
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-amber-600/15 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-900/20 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-yellow-900/10 blur-[100px] pointer-events-none" />

        {/* Sağ kenar çizgisi */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-600/20 to-transparent" />

        {/* Dev hayvan silueti - arka plan */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.035]"
          style={{ fontSize: "520px", lineHeight: 1 }}>
          🦁
        </div>

        {/* Pençe izi texture efekti */}
        <div className="absolute bottom-24 left-10 opacity-[0.06] pointer-events-none select-none"
          style={{ fontSize: "80px", transform: "rotate(-15deg)" }}>
          🐾
        </div>
        <div className="absolute top-32 right-20 opacity-[0.04] pointer-events-none select-none"
          style={{ fontSize: "55px", transform: "rotate(20deg)" }}>
          🐾
        </div>

        {/* Çizgi desen */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #f59e0b 0px, #f59e0b 1px, transparent 1px, transparent 12px)",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <div className="w-2 h-2 bg-white rounded-[3px] rotate-45" />
          </div>
          <span className="text-amber-400/40 text-[11px] tracking-[0.25em] uppercase font-medium" style={{ fontFamily: "monospace" }}>Nexus</span>
        </div>

        {/* Ana içerik */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300/80 text-[10px] font-medium tracking-[0.18em] uppercase" style={{ fontFamily: "monospace" }}>Yeni Nesil Platform</span>
          </div>

          <h1 className="text-white font-light leading-[1.04] tracking-[-0.02em] mb-7"
            style={{ fontSize: "clamp(44px, 4.5vw, 68px)", fontFamily: "'Georgia', serif" }}>
            Geleceği<br />
            <em className="not-italic font-normal"
              style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ef4444 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Birlikte
            </em><br />
            İnşa Et.
          </h1>

          <p className="text-white/25 text-[13px] font-light leading-[1.8] max-w-[300px] mb-12" style={{ fontFamily: "sans-serif" }}>
            Tasarımdan geliştirmeye, fikirden ürüne — her adımda yanında olan akıllı platform.
          </p>

          <div className="space-y-3.5">
            {[
              { icon: "🦁", text: "Anında kurulum, sıfır yapılandırma" },
              { icon: "🐺", text: "Uçtan uca şifrelenmiş güvenlik" },
              { icon: "🦅", text: "7/24 öncelikli destek" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-950/60 border border-amber-600/15 flex items-center justify-center text-sm flex-shrink-0 shadow-sm shadow-amber-900/40">
                  {f.icon}
                </div>
                <span className="text-amber-100/25 text-[12px] font-light tracking-wide" style={{ fontFamily: "sans-serif" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alt sosyal kanıt */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex">
            {[
              { l: "A", cls: "bg-amber-500" },
              { l: "K", cls: "bg-orange-600" },
              { l: "M", cls: "bg-red-600" },
            ].map(({ l, cls }, i) => (
              <div
                key={i}
                className={`relative w-7 h-7 rounded-full border-2 border-[#0f0e0a] flex items-center justify-center text-[10px] font-semibold text-white ${cls}`}
                style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 3 - i }}
              >
                {l}
              </div>
            ))}
          </div>
          <span className="text-amber-100/20 text-[11px] font-light tracking-wide" style={{ fontFamily: "sans-serif" }}>+2.400 kişi bu ay katıldı</span>
        </div>
      </div>


      {/* ════════════════════════════════
          SAĞ PANEL
      ════════════════════════════════ */}
      <div className="flex items-center justify-center px-8 py-16 relative overflow-hidden"
        style={{
          background: "linear-gradient(170deg, #12100a 0%, #0f0e0a 60%, #0a0c0f 100%)"
        }}>

        {/* Arka dekor */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-amber-800/8 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-orange-900/8 blur-[80px] pointer-events-none" />

        {/* Küçük pençe köşe süsü */}
        <div className="absolute top-8 right-8 opacity-[0.08] pointer-events-none select-none text-3xl">🐾</div>
        <div className="absolute bottom-8 left-8 opacity-[0.05] pointer-events-none select-none text-2xl" style={{ transform: "scaleX(-1) rotate(10deg)" }}>🐾</div>

        <div className="w-full max-w-[360px] relative z-10">

          {/* Başlık */}
          <div className="mb-10">
            <p className="text-amber-500/60 text-[10px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "monospace" }}>Hoş Geldin</p>
            <h2 className="text-white text-[30px] font-light tracking-tight leading-tight mb-1" style={{ fontFamily: "'Georgia', serif" }}>
              Hesap <span className="text-white/90 font-normal italic">Oluştur</span>
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-amber-500 to-orange-600" />
              <div className="h-px w-3 bg-white/10" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Ad Soyad */}
            <div className="group">
              <label className="block text-[9px] font-bold tracking-[0.16em] uppercase text-white/20 group-focus-within:text-amber-400 transition-all duration-300 mb-2 ml-1"
                style={{ fontFamily: "monospace" }}>
                Ad Soyad
              </label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] transition-all duration-300
                group-focus-within:border-amber-500/50
                group-focus-within:bg-amber-500/[0.05]
                group-focus-within:shadow-[0_0_0_4px_rgba(245,158,11,0.07),0_1px_16px_rgba(245,158,11,0.10)]">
                <User size={14} className="text-white/20 group-focus-within:text-amber-400 transition-colors flex-shrink-0" />
                <input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  placeholder="Adın ve soyadın"
                  className="w-full bg-transparent text-white/75 text-[13px] font-light outline-none placeholder:text-white/[0.12] tracking-wide"
                  style={{ fontFamily: "sans-serif" }}
                />
              </div>
            </div>

            {/* E-posta */}
            <div className="group">
              <label className="block text-[9px] font-bold tracking-[0.16em] uppercase text-white/20 group-focus-within:text-amber-400 transition-all duration-300 mb-2 ml-1"
                style={{ fontFamily: "monospace" }}>
                E-posta
              </label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] transition-all duration-300
                group-focus-within:border-amber-500/50
                group-focus-within:bg-amber-500/[0.05]
                group-focus-within:shadow-[0_0_0_4px_rgba(245,158,11,0.07),0_1px_16px_rgba(245,158,11,0.10)]">
                <Mail size={14} className="text-white/20 group-focus-within:text-amber-400 transition-colors flex-shrink-0" />
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="ornek@mail.com"
                  className="w-full bg-transparent text-white/75 text-[13px] font-light outline-none placeholder:text-white/[0.12] tracking-wide"
                  style={{ fontFamily: "sans-serif" }}
                />
              </div>
            </div>

            {/* Şifre */}
            <div className="group">
              <label className="block text-[9px] font-bold tracking-[0.16em] uppercase text-white/20 group-focus-within:text-amber-400 transition-all duration-300 mb-2 ml-1"
                style={{ fontFamily: "monospace" }}>
                Şifre
              </label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] transition-all duration-300
                group-focus-within:border-amber-500/50
                group-focus-within:bg-amber-500/[0.05]
                group-focus-within:shadow-[0_0_0_4px_rgba(245,158,11,0.07),0_1px_16px_rgba(245,158,11,0.10)]">
                <Lock size={14} className="text-white/20 group-focus-within:text-amber-400 transition-colors flex-shrink-0" />
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  placeholder="En az 8 karakter"
                  className="w-full bg-transparent text-white/75 text-[13px] font-light outline-none placeholder:text-white/[0.12] tracking-wide"
                  style={{ fontFamily: "sans-serif" }}
                />
              </div>
            </div>

            {/* Buton */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group w-full relative flex items-center justify-center gap-2.5 py-4 rounded-2xl text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none overflow-hidden
                  bg-gradient-to-br from-amber-500 via-orange-500 to-red-600
                  hover:from-amber-400 hover:via-orange-400 hover:to-red-500
                  text-white
                  shadow-[0_8px_32px_rgba(245,158,11,0.28),0_2px_8px_rgba(234,88,12,0.20)]
                  hover:shadow-[0_12px_44px_rgba(245,158,11,0.40),0_4px_16px_rgba(234,88,12,0.28)]
                  hover:-translate-y-0.5"
                style={{ fontFamily: "monospace", letterSpacing: "0.15em" }}
              >
                {/* İç parıltı */}
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent blur-sm" />

                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    <span>Ücretsiz Başla</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-7 border-t border-white/[0.05]">
            <p className="text-center text-white/20 text-[10px] tracking-[0.14em] uppercase" style={{ fontFamily: "monospace" }}>
              Zaten hesabın var mı?{" "}
              <button
                onClick={() => navigate("/")}
                className="text-amber-400 hover:text-amber-300 transition-colors font-semibold ml-0.5 cursor-pointer bg-transparent border-none outline-none"
              >
                Giriş yap →
              </button>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Register;