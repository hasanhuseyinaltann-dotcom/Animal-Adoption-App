import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  MapPin,
  Home,
  TreePine,
  Zap,
  ChevronLeft,
} from "lucide-react";
import AuthShell from "../components/AuthShell";
import AuthInput from "../components/AuthInput";
import CitySelect from "../components/CitySelect";
import { API_BASE } from "../config/api";
import { HOME_TIME_OPTIONS, ACTIVITY_OPTIONS } from "../data/turkishCities";
import { saveUser } from "../utils/auth";

function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "İstanbul",
    homeTimeLevel: 2,
    hasGarden: false,
    activityLevel: 2,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let nextValue = value;
    if (type === "checkbox") {
      nextValue = checked;
    } else if (type === "number" || type === "radio") {
      nextValue = Number(value);
    }
    setForm({ ...form, [name]: nextValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        city: form.city,
        homeTimeLevel: form.homeTimeLevel,
        hasGarden: form.hasGarden,
        activityLevel: form.activityLevel,
      });
      if (data.user) saveUser(data.user);
      alert("Kayıt başarılı! Kişisel önerileriniz hazır.");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.code === "ERR_NETWORK"
          ? "Sunucuya bağlanılamadı. Backend'in çalıştığından emin olun (http://localhost:5081)."
          : "Kayıt sırasında bir hata oluştu.");
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      variant="register"
      footer={
        <>
          Zaten hesabın var mı?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Giriş yap →
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {step === 1 ? (
          <>
            <p className="rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-800">
              Adım 1/2 — Hesap bilgileri
            </p>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Ad Soyad
              </label>
              <AuthInput
                icon={User}
                type="text"
                name="name"
                required
                value={form.name}
                placeholder="Adın ve soyadın"
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                E-posta
              </label>
              <AuthInput
                icon={Mail}
                type="email"
                name="email"
                required
                value={form.email}
                placeholder="ornek@mail.com"
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Şifre
              </label>
              <AuthInput
                icon={Lock}
                type="password"
                name="password"
                required
                minLength={6}
                value={form.password}
                placeholder="En az 6 karakter"
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Yaşam tarzı bilgileri
              <ArrowRight size={18} />
            </button>
          </>
        ) : (
          <>
            <p className="rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-800">
              Adım 2/2 — Yaşam tarzı ve konum (öneriler için)
            </p>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                <MapPin size={14} />
                Şehir
              </label>
              <CitySelect value={form.city} onChange={handleChange} />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                <Home size={14} />
                Evde ne kadar vakit geçiriyorsunuz?
              </label>
              <div className="space-y-2">
                {HOME_TIME_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition ${
                      form.homeTimeLevel === opt.value
                        ? "border-brand-400 bg-brand-50"
                        : "border-brand-100 hover:border-brand-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="homeTimeLevel"
                      value={opt.value}
                      checked={form.homeTimeLevel === opt.value}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <span className="text-ink">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-brand-100 p-4 transition hover:border-brand-200">
              <input
                type="checkbox"
                name="hasGarden"
                checked={form.hasGarden}
                onChange={handleChange}
                className="h-4 w-4 rounded border-brand-300 text-brand-600"
              />
              <span className="flex items-center gap-2 text-sm font-medium text-ink">
                <TreePine size={18} className="text-brand-600" />
                Evimde bahçe veya geniş açık alan var
              </span>
            </label>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                <Zap size={14} />
                Enerji ve aktivite seviyeniz
              </label>
              <div className="space-y-2">
                {ACTIVITY_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition ${
                      form.activityLevel === opt.value
                        ? "border-brand-400 bg-brand-50"
                        : "border-brand-100 hover:border-brand-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="activityLevel"
                      value={opt.value}
                      checked={form.activityLevel === opt.value}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <span className="text-ink">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary flex-1"
              >
                <ChevronLeft size={18} />
                Geri
              </button>
              <button type="submit" disabled={loading} className="btn-primary flex-[2]">
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Kaydediliyor…
                  </>
                ) : (
                  <>
                    Kaydı Tamamla
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </form>
    </AuthShell>
  );
}

export default Register;
