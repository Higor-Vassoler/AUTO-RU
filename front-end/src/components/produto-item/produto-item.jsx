import "./produto-item.css";

function ProdutoItem({ produto }) {
  const semEstoque = produto.quantidade_estoque <= 0;

  return (
    <article className="produto-item">
      <div className="produto-item-imagem-container">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="produto-item-imagem"
        />
      </div>

      <div className="produto-item-info">
        <h3 className="produto-item-nome">{produto.nome}</h3>
        <p className="produto-item-descricao">{produto.descricao}</p>

        <span className="produto-item-preco">
          R$ {produto.preco_unitario.toFixed(2)}
        </span>

        <span
          className={`produto-item-estoque ${semEstoque ? "sem-estoque" : ""}`}
        >
          {semEstoque
            ? "Sem estoque"
            : `Estoque: ${produto.quantidade_estoque} unidades`}
        </span>
      </div>
    </article>
  );
}

export default ProdutoItem;
