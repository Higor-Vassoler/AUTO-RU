import "./header.css";
import { ShoppingCart, UserCircle, UtensilsCrossed } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isPerfilArea = location.pathname.startsWith("/cadastro-produtos");

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <div className="header__logo">
          <div className="logo-circle">
            <UtensilsCrossed size={28} />
          </div>

          <div className="logo-text">
            <h1>RU</h1>

            <div className="logo-subtitle">
              <span>Refeitório</span>
              <span>Universitário</span>
            </div>
          </div>
        </div>
      </NavLink>

      <nav className="header__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link--active" : "nav-link"
          }
        >
          Catálogo
        </NavLink>

        <NavLink to="/cardapio" className="nav-link">
          Cardápio
        </NavLink>

        <NavLink to="/sobre" className="nav-link">
          Sobre o RU
        </NavLink>

        <NavLink to="/contato" className="nav-link">
          Contato
        </NavLink>
      </nav>

      <div className="header__actions">
        <NavLink to="/carrinho" className="header-link">
          <ShoppingCart size={28} />
        </NavLink>

        <NavLink
          to="/cadastro-produtos"
          className={
            isPerfilArea ? "header-link header-link--active" : "header-link"
          }
        >
          <UserCircle size={42} />
        </NavLink>
      </div>
    </header>
  );
}
