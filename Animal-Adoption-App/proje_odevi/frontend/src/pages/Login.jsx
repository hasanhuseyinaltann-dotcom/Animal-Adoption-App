import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5081/api/auth/login",
        form
      );

      alert("Giriş başarılı");

      navigate("/dashboard");
    } catch {
      alert("Email veya şifre hatalı");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 font-sans bg-[#07070F] selection:bg-indigo-500/30">

      {/* ════════════ SOL PANEL ════════════ */}
      <div className="hidden lg:flex relative flex-col justify-between p-16 overflow-hidden">

        {/* Dekor ışıkları */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-violet-600/8 blur-[130px] pointer-events-none" />

        {/* Sağ kenar çizgisi */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />

        {/* Nokta deseni */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Büyük dekoratif SVG - soyut dalga/hayvan formu */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
          viewBox="0 0 600 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Soyut kartal/kuş kanat formu */}
          <path d="M-50 400 Q150 100 300 300 Q450 500 650 200" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M-50 450 Q100 150 300 350 Q500 550 650 250" stroke="white" strokeWidth="1" fill="none" />
          <path d="M0 600 Q200 300 350 400 Q500 500 700 150" stroke="white" strokeWidth="0.8" fill="none" />
          <path d="M50 700 Q250 400 400 450 Q550 500 700 100" stroke="white" strokeWidth="0.6" fill="none" />
          {/* Tüy/kanat detayları */}
          <path d="M100 500 Q200 350 300 300" stroke="white" strokeWidth="0.5" fill="none" opacity="0.5" />
          <path d="M150 520 Q250 370 350 320" stroke="white" strokeWidth="0.5" fill="none" opacity="0.4" />
          <path d="M200 540 Q300 390 400 340" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
          {/* Daireler - gözler/yıldızlar */}
          <circle cx="300" cy="300" r="80" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
          <circle cx="300" cy="300" r="120" stroke="white" strokeWidth="0.3" fill="none" opacity="0.15" />
          <circle cx="300" cy="300" r="160" stroke="white" strokeWidth="0.2" fill="none" opacity="0.1" />
          <circle cx="300" cy="300" r="4" fill="white" opacity="0.4" />
          <circle cx="480" cy="180" r="2" fill="white" opacity="0.5" />
          <circle cx="150" cy="500" r="2" fill="white" opacity="0.4" />
          <circle cx="520" cy="480" r="1.5" fill="white" opacity="0.3" />
        </svg>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <div className="w-2 h-2 bg-white rounded-[3px] rotate-45" />
          </div>
          <span className="text-white/30 text-[11px] tracking-[0.25em] uppercase font-medium">Nexus</span>
        </div>

        {/* Ana içerik */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/8 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-300/80 text-[10px] font-medium tracking-[0.18em] uppercase">Tekrar Hoş Geldin</span>
          </div>

          <h1 className="text-white font-light leading-[1.04] tracking-[-0.02em] mb-7"
            style={{ fontSize: "clamp(44px, 4.5vw, 68px)" }}>
            Hesabına<br />
            <em className="not-italic font-normal"
              style={{ background: "linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Güvenle
            </em><br />
            Giriş Yap.
          </h1>

          <p className="text-white/25 text-[13px] font-light leading-[1.8] max-w-[300px] mb-12">
            Tüm projelerine, takımına ve araçlarına tek bir yerden ulaş.
          </p>

          <div className="space-y-3.5">
            {[
              { icon: "🦁", label: "Güçlü", text: "Kurumsal düzeyde altyapı" },
              { icon: "🐺", label: "Hızlı", text: "Milisaniye düzeyinde yanıt" },
              { icon: "🦅", label: "Özgür", text: "Her cihazdan erişim" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                  {/* SVG ikon yerine renkli harf badge */}
                  <span className="text-xs font-bold text-indigo-400">{f.label[0]}</span>
                </div>
                <div>
                  <span className="text-white/50 text-[11px] font-medium">{f.label} — </span>
                  <span className="text-white/25 text-[11px] font-light">{f.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alt sosyal kanıt */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex">
            {[
              { l: "A", cls: "bg-indigo-500" },
              { l: "K", cls: "bg-rose-500" },
              { l: "M", cls: "bg-cyan-500" },
            ].map(({ l, cls }, i) => (
              <div
                key={i}
                className={`relative w-7 h-7 rounded-full border-2 border-[#07070F] flex items-center justify-center text-[10px] font-semibold text-white ${cls}`}
                style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 3 - i }}
              >
                {l}
              </div>
            ))}
          </div>
          <span className="text-white/20 text-[11px] font-light tracking-wide">+2.400 aktif kullanıcı</span>
        </div>
      </div>


      {/* ════════════ SAĞ PANEL ════════════ */}
      <div className="flex items-center justify-center px-8 py-16 bg-[#0c0c1a] relative overflow-hidden">

        {/* Arka dekor */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-violet-700/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-indigo-700/5 blur-[80px] pointer-events-none" />

        {/* Dekoratif köşe SVG */}
        <svg className="absolute top-6 right-6 opacity-[0.06] pointer-events-none" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="55" stroke="white" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="40" stroke="white" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="25" stroke="white" strokeWidth="0.5" />
          <line x1="5" y1="60" x2="115" y2="60" stroke="white" strokeWidth="0.5" />
          <line x1="60" y1="5" x2="60" y2="115" stroke="white" strokeWidth="0.5" />
          <line x1="20" y1="20" x2="100" y2="100" stroke="white" strokeWidth="0.3" />
          <line x1="100" y1="20" x2="20" y2="100" stroke="white" strokeWidth="0.3" />
        </svg>

        <svg className="absolute bottom-6 left-6 opacity-[0.04] pointer-events-none" width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M10 40 Q40 10 70 40 Q40 70 10 40Z" stroke="white" strokeWidth="0.5" fill="none" />
          <path d="M20 40 Q40 20 60 40 Q40 60 20 40Z" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="40" cy="40" r="5" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>

        <div className="w-full max-w-[360px] relative z-10">

          {/* Başlık */}
          <div className="mb-10">
            <p className="text-indigo-400/60 text-[10px] font-semibold tracking-[0.2em] uppercase mb-3">Tekrar Hoş Geldin</p>
            <h2 className="text-white text-[30px] font-light tracking-tight leading-tight mb-1">
              Hesap <span className="text-white/90 font-normal italic">Girişi</span>
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-indigo-500 to-violet-500" />
              <div className="h-px w-3 bg-white/10" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* E-posta */}
            <div className="group">
              <label className="block text-[9px] font-bold tracking-[0.16em] uppercase text-white/20 group-focus-within:text-indigo-400 transition-all duration-300 mb-2 ml-1">
                E-posta
              </label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.025] border border-white/[0.06] transition-all duration-300
                group-focus-within:border-indigo-500/40
                group-focus-within:bg-indigo-500/[0.04]
                group-focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.06),0_1px_12px_rgba(99,102,241,0.08)]">
                {/* Mail SVG icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/20 group-focus-within:text-indigo-400 transition-colors flex-shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full bg-transparent text-white/75 text-[13px] font-light outline-none placeholder:text-white/[0.12] tracking-wide"
                />
              </div>
            </div>

            {/* Şifre */}
            <div className="group">
              <label className="block text-[9px] font-bold tracking-[0.16em] uppercase text-white/20 group-focus-within:text-indigo-400 transition-all duration-300 mb-2 ml-1">
                Şifre
              </label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.025] border border-white/[0.06] transition-all duration-300
                group-focus-within:border-indigo-500/40
                group-focus-within:bg-indigo-500/[0.04]
                group-focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.06),0_1px_12px_rgba(99,102,241,0.08)]">
                {/* Lock SVG icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/20 group-focus-within:text-indigo-400 transition-colors flex-shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  name="password"
                  placeholder="Şifre"
                  onChange={handleChange}
                  className="w-full bg-transparent text-white/75 text-[13px] font-light outline-none placeholder:text-white/[0.12] tracking-wide"
                />
              </div>
            </div>

            {/* Buton */}
            <div className="pt-4">
              <button
                type="submit"
                className="group w-full relative flex items-center justify-center gap-2.5 py-4 rounded-2xl text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-[0.98] overflow-hidden
                  bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700
                  hover:from-indigo-500 hover:via-indigo-500 hover:to-violet-600
                  text-white
                  shadow-[0_8px_32px_rgba(99,102,241,0.25),0_2px_8px_rgba(99,102,241,0.15)]
                  hover:shadow-[0_12px_40px_rgba(99,102,241,0.35),0_4px_12px_rgba(99,102,241,0.2)]
                  hover:-translate-y-0.5"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
                <span>Giriş Yap</span>
                {/* Arrow SVG */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-7 border-t border-white/[0.05]">
            <p className="text-center text-white/20 text-[10px] tracking-[0.14em] uppercase">
              Hesabın yok mu?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-indigo-400 hover:text-indigo-300 transition-colors font-semibold ml-0.5 cursor-pointer bg-transparent border-none outline-none"
              >
                Kayıt Ol →
              </button>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;