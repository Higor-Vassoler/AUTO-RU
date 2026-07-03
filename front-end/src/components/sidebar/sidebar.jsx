import "./sidebar.css";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Shield,
  Bell,
  Heart,
  Package,
  ShoppingBag,
  LogOut,
  Headphones,
} from "lucide-react";

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("cadastrar-produto");
  const location = useLocation();
  const isProductsOpen = location.pathname.startsWith("/cadastro-produtos");

  const navigate = useNavigate();

  const handleLogout = () => {
    const resposta = window.confirm("Tem certeza que deseja sair da conta?");

    if (!resposta) {
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");

    navigate("/login");
  };

  useEffect(() => {
    // O listener de scroll só faz sentido enquanto a página de
    // Cadastro de Produtos estiver aberta
    if (!isProductsOpen) return;

    const handleScroll = () => {
      const cadastro = document.getElementById("cadastrar-produto");
      const salvos = document.getElementById("produtos-salvos");

      if (!cadastro || !salvos) return;

      const salvosTop = salvos.getBoundingClientRect().top;

      setActiveSection(
        salvosTop < 250 ? "produtos-salvos" : "cadastrar-produto",
      );
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isProductsOpen]);

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            isActive ? "nav-item nav-item--active" : "nav-item"
          }
        >
          <User size={24} className="nav-icon" />
          <span className="nav-label">Meu Perfil</span>
        </NavLink>

        <NavLink
          to="/seguranca"
          className={({ isActive }) =>
            isActive ? "nav-item nav-item--active" : "nav-item"
          }
        >
          <Shield size={24} className="nav-icon" />
          <span className="nav-label">Segurança</span>
        </NavLink>

        <NavLink
          to="/notificacoes"
          className={({ isActive }) =>
            isActive ? "nav-item nav-item--active" : "nav-item"
          }
        >
          <Bell size={24} className="nav-icon" />
          <span className="nav-label">Notificações</span>
        </NavLink>

        <NavLink
          to="/favoritos"
          className={({ isActive }) =>
            isActive ? "nav-item nav-item--active" : "nav-item"
          }
        >
          <Heart size={24} className="nav-icon" />
          <span className="nav-label">Favoritos</span>
        </NavLink>

        <div className="divider" />

        <NavLink
          to="/cadastro-produtos"
          className={({ isActive }) =>
            isActive ? "nav-item nav-item--active" : "nav-item"
          }
        >
          <Package size={24} className="nav-icon" />
          <span className="nav-label">Produtos</span>
        </NavLink>

        {isProductsOpen && (
          <div className="submenu">
            <button
              onClick={() =>
                document.getElementById("cadastrar-produto")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className={
                activeSection === "cadastrar-produto"
                  ? "submenu-item submenu-item--active"
                  : "submenu-item"
              }
            >
              <span className="submenu-bullet" />
              <span className="submenu-label">Cadastrar produto</span>
            </button>

            <button
              onClick={() =>
                document.getElementById("produtos-salvos")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className={
                activeSection === "produtos-salvos"
                  ? "submenu-item submenu-item--active"
                  : "submenu-item"
              }
            >
              <span className="submenu-bullet" />
              <span className="submenu-label">Produtos salvos</span>
            </button>
          </div>
        )}

        <NavLink
          to="/minhas-compras"
          className={({ isActive }) =>
            isActive ? "nav-item nav-item--active" : "nav-item"
          }
        >
          <ShoppingBag size={24} className="nav-icon" />
          <span className="nav-label">Minhas Compras</span>
        </NavLink>

        <div className="divider" />

        <button className="nav-item nav-item--logout" onClick={handleLogout}>
          <LogOut size={24} className="nav-icon" />
          <span className="nav-label">Sair da conta</span>
        </button>
      </nav>

      <div className="help-card">
        <div className="help-icon-wrap">
          <Headphones size={22} className="help-icon" />
        </div>

        <div className="help-body">
          <p className="help-title">Precisa de ajuda?</p>
          <p className="help-desc">Entre em contato com o suporte do RU.</p>
        </div>

        <a
          className="help-btn"
          href="https://chatgpt.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar com suporte
        </a>
      </div>
    </aside>
  );
}
