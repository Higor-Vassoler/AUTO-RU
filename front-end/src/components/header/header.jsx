import React, { useState } from "react";
import "./header.css";
import { ShoppingCart, UserCircle, UtensilsCrossed } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import CartModal from "../../pages/carrinho/CarrinhoModal.jsx";

export default function Header() {
  const location = useLocation();
  const isPerfilArea = location.pathname.startsWith("/cadastro-produtos");

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Prato Feito Tradicional",
      price: 16.5,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Suco de Laranja",
      price: 5.5,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Batata Frita",
      price: 7.5,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
  ]);

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
        {}
        <button
          className="header-link header-link--cart"
          onClick={() => setIsCartOpen(!isCartOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <div style={{ position: "relative" }}>
            <ShoppingCart size={28} />
            {}
            {cartItems.length > 0 && (
              <span className="cart-badge">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </div>
        </button>

        <NavLink
          to="/perfil"
          className={
            isPerfilArea ? "header-link header-link--active" : "header-link"
          }
        >
          <UserCircle size={42} />
        </NavLink>
      </div>

      {}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </header>
  );
}
