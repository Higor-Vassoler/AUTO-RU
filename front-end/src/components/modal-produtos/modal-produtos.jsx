import { useEffect, useState } from "react";
import "./modal-produtos.css";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";

export default function ModalProduto({ produto, aberto, onClose, onAddCart }) {
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    if (aberto) setQuantidade(1);
  }, [aberto, produto]);

  if (!aberto || !produto) return null;

  function aumentar() {
    if (quantidade < produto.quantidade_estoque) {
      setQuantidade((q) => q + 1);
    }
  }

  function diminuir() {
    if (quantidade > 1) {
      setQuantidade((q) => q - 1);
    }
  }

  function handleAdicionar() {
    onAddCart(produto, quantidade);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-produto" onClick={(e) => e.stopPropagation()}>
        <button className="fechar-modal" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-imagem">
          <img src={produto.imagem} alt={produto.nome} />
        </div>

        <div className="modal-info">
          <h2>{produto.nome}</h2>

          <span className="modal-preco">
            R$ {produto.preco_unitario.toFixed(2)}
          </span>

          <div className="modal-descricao">
            <h3>Descrição e ingredientes</h3>
            <p>{produto.descricao}</p>
          </div>

          <div className="modal-quantidade">
            <button onClick={diminuir}>
              <Minus size={18} />
            </button>

            <span>{quantidade}</span>

            <button onClick={aumentar}>
              <Plus size={18} />
            </button>
          </div>

          <button className="btn-carrinho" onClick={handleAdicionar}>
            <ShoppingCart size={18} />
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
