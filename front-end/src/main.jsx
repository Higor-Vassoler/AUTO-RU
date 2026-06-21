import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style.css";
import Home from "./pages/home/index.jsx";
import Produtos from "./pages/cadastro-produtos/produtos/produtos.jsx";
import Cadastro from "./pages/cadastro/index.jsx";
import Login from "./pages/login/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-produtos" element={<Produtos />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
