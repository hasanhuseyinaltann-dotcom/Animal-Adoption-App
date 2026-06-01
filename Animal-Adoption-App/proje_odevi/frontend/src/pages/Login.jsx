import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import AuthShell from "../components/AuthShell";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5081/api/auth/login", form);
      navigate("/dashboard");
    } catch {
      alert("E-posta veya şifre hatalı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      variant="login"
      footer={
        <>
          Hesabın yok mu?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Kayıt ol →
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="••••••••"
              onChange={handleChange}
              className="input-field pl-11"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>
    </AuthShell>
  );
}

export default Login;
