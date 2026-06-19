import "./style.css";

import { Pencil, Trash2 } from "lucide-react";

{
  /*
    Aqui iria os produtos que eu salvei, mas n possuimos backend ainda, a injeção dos valores se daria pela logica do backend que em "informacoes-produtos.jsx" ao salvar um produto que vc cadastrou, ele enviaria e salvaria os dados para o banco de dados e a variavel "produtos" que consta nesse arquivo buscaria os valores no banco de dados para injetar nesta tabela.

    Se ficar muito fudido da para nos tirar esse arquivo e só deixar "informacoes-produtos.jsx" msm, mas dai nos n confirmariamos se o produto foi salvo no banco ou não, para isso que serve esse arquivo, para pegar os dados do banco e jogar na tela.
*/
}

export default function ProdutosSalvos({ produtos }) {
  return (
    <section className="saved-products-card">
      <h2>Produtos salvos</h2>

      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
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

                  <button className="delete-btn">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
