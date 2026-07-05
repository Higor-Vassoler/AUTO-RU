import { useContext, useState } from "react";
import "./header.css";
import { ShoppingCart, UserCircle, UtensilsCrossed } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import CartModal from "../../pages/carrinho/CarrinhoModal.jsx";
import { CartContext } from "../../context/CartContext.jsx";

export default function Header() {
  const location = useLocation();
  const isPerfilArea = location.pathname.startsWith("/cadastro-produtos");

  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems, setCartItems } = useContext(CartContext);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  return (
    <header className="header">
      <NavLink to="/catalogo" className="header__logo-link">
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
          to="/catalogo"
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
          Sobre o AutoRU
        </NavLink>

        <NavLink to="/contato" className="nav-link">
          Contato
        </NavLink>
      </nav>

      <div className="header__actions">
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

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
      />
    </header>
  );
}