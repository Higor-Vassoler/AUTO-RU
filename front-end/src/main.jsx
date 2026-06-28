import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './style.css'
import RotaFuncionario from "./components/rota-protegida/RotaFuncionario.jsx";
import RotaProtegida from "./components/rota-protegida/RotaProtegida.jsx";
import Produtos from "./pages/cadastro-produtos/produtos/produtos.jsx";
import Cadastro from "./pages/cadastro/cadastro.jsx";
import Login from "./pages/login/index.jsx";
import Perfil from "./pages/perfil/perfil.jsx";
import Catalogo from "./pages/catalogo/catalogo.jsx";
import SobreRU from "./pages/sobre/sobre.jsx";
import ContatoRU from "./pages/contato/contato.jsx";
import CardapioRU from "./pages/cardapio/cardapio.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 🟢 ROTAS PÚBLICAS */}
        <Route path="/" element={<Catalogo />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sobre" element={<SobreRU />} />
        <Route path="/cardapio" element={<CardapioRU />} />
        <Route path="/contato" element={<ContatoRU />} />

        {/* 🔴 ROTAS PRIVADAS */}
        <Route
          path="/perfil"
          element={
            <RotaProtegida>
              <Perfil />
            </RotaProtegida>
          }
        />
        <Route
          path="/cadastro-produtos"
          element={
            <RotaFuncionario>
              <Produtos />
            </RotaFuncionario>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
