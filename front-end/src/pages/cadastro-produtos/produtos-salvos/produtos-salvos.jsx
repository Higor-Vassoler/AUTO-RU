import "./style.css";
import { Pencil, Trash2 } from "lucide-react";

export default function ProdutosSalvos({ produtos, onProdutoDeletado, onEditarProduto }) {
  async function handleDelete(id, nome) {
    const confirmar = window.confirm(`Deseja realmente remover o produto "${nome}"?`);
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:5000/api/produtos/${id}/ocultar`, {
        method: "PATCH",
      });

      const data = await response.json().catch(() => ({ erro: "Não foi possível ler o JSON do backend" }));

      if (response.ok) {
        if (onProdutoDeletado) {
          onProdutoDeletado();
        }
      } else {
        console.error("Erro reportado pelo backend:", data);
        alert(`Erro do backend: ${data.erro || data.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro no momento do fetch:", error);
      alert("Erro na comunicação com o servidor. Abra o console (F12) para ver.");
    }
  }

  return (
    <section id="produtos-salvos" className="saved-products-card">
      <h2>Produtos salvos</h2>

      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID do produto</th>
              <th>Nome do produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-state">
                  Nenhum produto cadastrado.
                </td>
              </tr>
            ) : (
              produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.categoria}</td>
                  <td>R$ {produto.preco}</td>
                  <td>{produto.quantidade}</td>

                  <td className="actions-column">
                    <button className="edit-btn">
                      <Pencil size={16} />
                    </button>

                    <button className="delete-btn" onClick={() => handleDelete(produto.id, produto.nome)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="table-info">Mostrando {produtos.length} produto(s)</p>
    </section>
  );
}
