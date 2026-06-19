import "./header.css";
import { ShoppingCart, UserCircle, UtensilsCrossed } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <div className="logo-circle">
          <UtensilsCrossed size={28} />
        </div>

        <div className="logo-text">
          <h1>RU</h1>
          <span>Refeitório Universitário</span>
        </div>
      </div>

      <nav className="header__nav">
        <a href="/">Catálogo</a>
        <a href="/">Cardápio</a>
        <a href="/">Sobre o RU</a>
        <a href="/">Contato</a>
      </nav>

      <div className="header__actions">
        <div className="cart">
          <ShoppingCart size={28} />
          <span className="cart-badge">2</span>
        </div>

        <UserCircle size={42} />
      </div>
    </header>
  );
}
