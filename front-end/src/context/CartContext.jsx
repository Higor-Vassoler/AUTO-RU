import { useState, useEffect } from "react";
import { CartContext } from "./cart-context.js";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const carrinhoSalvo = localStorage.getItem("carrinhoRU");
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("carrinhoRU", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(produtoSelecionado, quantidadeSelecionada) {
    const itemExistente = cartItems.find(
      (item) => item.id === produtoSelecionado.id_produto,
    );

    if (itemExistente) {
      if (itemExistente.quantity >= produtoSelecionado.quantidade_estoque) {
        alert(
          `Você já possui o limite máximo de ${produtoSelecionado.quantidade_estoque} unidades de ${produtoSelecionado.nome} no carrinho!`,
        );
        return;
      }

      const novaQuantidade = itemExistente.quantity + quantidadeSelecionada;

      if (novaQuantidade > produtoSelecionado.quantidade_estoque) {
        const quantidadePossivel =
          produtoSelecionado.quantidade_estoque - itemExistente.quantity;

        alert(
          `Você já tinha ${itemExistente.quantity} no carrinho. Só foi possível adicionar mais ${quantidadePossivel} unidade(s) para atingir o limite do estoque.`,
        );

        setCartItems((carrinhoAnterior) =>
          carrinhoAnterior.map((item) =>
            item.id === produtoSelecionado.id_produto
              ? { ...item, quantity: produtoSelecionado.quantidade_estoque }
              : item,
          ),
        );
      } else {
        setCartItems((carrinhoAnterior) =>
          carrinhoAnterior.map((item) =>
            item.id === produtoSelecionado.id_produto
              ? { ...item, quantity: novaQuantidade }
              : item,
          ),
        );
        alert(
          `${quantidadeSelecionada}x ${produtoSelecionado.nome} adicionado(s) ao carrinho.`,
        );
      }
    } else {
      setCartItems((carrinhoAnterior) => [
        ...carrinhoAnterior,
        {
          id: produtoSelecionado.id_produto,
          name: produtoSelecionado.nome,
          image: produtoSelecionado.imagem,
          price: produtoSelecionado.preco_unitario,
          quantity: quantidadeSelecionada,
          estoqueMaximo: produtoSelecionado.quantidade_estoque,
        },
      ]);
      alert(
        `${quantidadeSelecionada}x ${produtoSelecionado.nome} adicionado(s) ao carrinho.`,
      );
    }
  }

  function updateQuantity(itemId, novaQuantidade) {
    if (novaQuantidade < 1) {
      setCartItems((carrinhoAnterior) =>
        carrinhoAnterior.filter((item) => item.id !== itemId),
      );
      return;
    }

    const itemAtual = cartItems.find((item) => item.id === itemId);
    if (!itemAtual) return;

    if (novaQuantidade > itemAtual.estoqueMaximo) {
      alert(`Existem apenas ${itemAtual.estoqueMaximo} itens no estoque.`);
      return;
    }

    setCartItems((carrinhoAnterior) =>
      carrinhoAnterior.map((item) =>
        item.id === itemId ? { ...item, quantity: novaQuantidade } : item,
      ),
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
