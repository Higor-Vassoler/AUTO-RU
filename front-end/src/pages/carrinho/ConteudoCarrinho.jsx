import { useState } from "react";
import { CartContext } from "../../context/cart-context.js";

export const CartProvider = ({ children }) => {
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
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
