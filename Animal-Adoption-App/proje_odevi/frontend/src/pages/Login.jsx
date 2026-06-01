import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import AuthShell from "../components/AuthShell";
import AuthInput from "../components/AuthInput";
import { API_BASE } from "../config/api";
import { saveUser } from "../utils/auth";

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
      const { data } = await axios.post(`${API_BASE}/auth/login`, form);
      if (data.user) saveUser(data.user);
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
            value={form.password}
            placeholder="••••••••"
            onChange={handleChange}
            autoComplete="current-password"
          />
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
