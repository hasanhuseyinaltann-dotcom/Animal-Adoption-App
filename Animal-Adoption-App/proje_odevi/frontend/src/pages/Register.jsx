import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import AuthShell from "../components/AuthShell";

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
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
      navigate("/");
    } catch {
      alert("Kayıt sırasında bir hata oluştu.");
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
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
            Ad Soyad
          </label>
          <div className="relative">
            <User
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50"
            />
            <input
              type="text"
              name="name"
              required
              placeholder="Adın ve soyadın"
              onChange={handleChange}
              className="input-field pl-11"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
            E-posta
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="ornek@mail.com"
              onChange={handleChange}
              className="input-field pl-11"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
            Şifre
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50"
            />
            <input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="En az 6 karakter"
              onChange={handleChange}
              className="input-field pl-11"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Kaydediliyor…
            </>
          ) : (
            <>
              Ücretsiz Kayıt Ol
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </AuthShell>
  );
}

export default Register;
