import { useState } from "react";
import "./modal-produtos.css";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";

export default function ModalProduto({ produto, aberto, onClose, onAddCart }) {
  const [quantidade, setQuantidade] = useState(
    produto && produto.quantidade_estoque > 0 ? 1 : 0,
  );

  if (!aberto || !produto) return null;

  const isEsgotado = produto.quantidade_estoque === 0;

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
    if (quantidade <= 0 || isEsgotado) return;
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

          {isEsgotado ? (
            <span className="msg-indisponivel">
              Produto indisponível no estoque
            </span>
          ) : (
            <div className="modal-quantidade">
              <button onClick={diminuir} disabled={quantidade <= 1}>
                <Minus size={18} />
              </button>

              <span>{quantidade}</span>

              <button
                onClick={aumentar}
                disabled={quantidade >= produto.quantidade_estoque}
              >
                <Plus size={18} />
              </button>
            </div>
          )}

          <button
            className={`btn-carrinho ${isEsgotado ? "desabilitado" : ""}`}
            onClick={handleAdicionar}
            disabled={isEsgotado || quantidade === 0}
          >
            <ShoppingCart size={18} />
            {isEsgotado ? "Esgotado" : "Adicionar ao carrinho"}
          </button>
        </div>
      </div>
    </div>
  );
}
