import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './style.css'
import Produtos from "./pages/cadastro-produtos/produtos/produtos.jsx";
import Cadastro from "./pages/cadastro/cadastro.jsx";
import Login from "./pages/login/index.jsx";
import Perfil from "./pages/perfil/perfil.jsx";
import Catalogo from "./pages/catalogo/catalogo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/cadastro-produtos" element={<Produtos />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
