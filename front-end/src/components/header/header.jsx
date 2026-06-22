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
        {/* lembrar de colocar o caminho de cada link aqui mais tarde, para redirecionamento */}
        <a href="/">Catálogo</a>
        <a href="/">Cardápio</a>
        <a href="/">Sobre o RU</a>
        <a href="/">Contato</a>
      </nav>

      <div className="header__actions">
        <div className="cart">
          <ShoppingCart size={28} />
          {/*comentei o codigo abaixo pq ele adiciona uma contagem de itens no carrinho, na qual se der tempo mais tarde iremos automatizar essa contagem, por enquanto ele se mantem sem contagem*/}
          {/* <span className="cart-badge">2</span> */}
        </div>

        <UserCircle size={42} />
      </div>
    </header>
  );
}
