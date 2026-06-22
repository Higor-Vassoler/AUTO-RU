import "./produto-card.css";

function ProdutoCard({ produto }) {
  const semEstoque = produto.quantidade_estoque <= 0;

  return (
    <article className="produto-card">
      <div className="produto-imagem-container">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="produto-imagem"
        />
      </div>

      <div className="produto-info">
        <h3 className="produto-nome">{produto.nome}</h3>
        <p className="produto-descricao">{produto.descricao}</p>

        <span className="produto-preco">
          R$ {produto.preco_unitario.toFixed(2)}
        </span>

        <span className={`produto-estoque ${semEstoque ? "sem-estoque" : ""}`}>
          {semEstoque
            ? "Sem estoque"
            : `Estoque: ${produto.quantidade_estoque} unidades`}
        </span>
      </div>
    </article>
  );
}

export default ProdutoCard;
