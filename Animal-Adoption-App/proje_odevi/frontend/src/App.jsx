import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; // 1. Yeni profil sayfamızı import ettik
import "./App.css";
import PetDetail from "./pages/PetDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Giriş yapınca gidilecek sayfalar */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pet/:id" element={<PetDetail />} />
        <Route path="/profile" element={<Profile />} /> {/* 2. Profil rotasını ekledik */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;