import "./sidebar.css";
import { useEffect, useState } from "react";
import {
  User,
  Shield,
  Bell,
  Heart,
  Package,
  LogOut,
  Headphones,
} from "lucide-react";

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("cadastrar-produto");

  useEffect(() => {
    const handleScroll = () => {
      const cadastro = document.getElementById("cadastrar-produto");
      const salvos = document.getElementById("produtos-salvos");

      if (!cadastro || !salvos) return;

      const salvosTop = salvos.getBoundingClientRect().top;

      if (salvosTop < 250) {
        setActiveSection("produtos-salvos");
      } else {
        setActiveSection("cadastrar-produto");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <button className="nav-item">
          <User size={24} className="nav-icon" />
          <span className="nav-label">Meu Perfil</span>
        </button>

        <button className="nav-item">
          <Shield size={24} className="nav-icon" />
          <span className="nav-label">Segurança</span>
        </button>

        <button className="nav-item">
          <Bell size={24} className="nav-icon" />
          <span className="nav-label">Notificações</span>
        </button>

        <button className="nav-item">
          <Heart size={24} className="nav-icon" />
          <span className="nav-label">Favoritos</span>
        </button>

        <div className="divider" />

        <button className="nav-item nav-item--active">
          <span className="nav-indicator" />

          <Package size={24} className="nav-icon" />

          <span className="nav-label">Produtos</span>
        </button>

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

        <div className="divider" />

        <button className="nav-item nav-item--logout">
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
