import "./filtros.css";

function Filtros({
  categoriaSelecionada,
  setCategoriaSelecionada,
  setPaginaAtual,
  ordenacao,
  setOrdenacao,
}) {
  return (
    <div className="filtros">
      <div className="filtro-grupo">
        <label>Filtrar por categoria</label>

        <select
          value={categoriaSelecionada}
          onChange={(e) => {
            setCategoriaSelecionada(e.target.value);
            setPaginaAtual;
          }}
        >
          <option value="Todas">Todas</option>
          <option value="Pratos Principais">Pratos Principais</option>
          <option value="Acompanhamentos">Acompanhamentos</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Sobremesas">Sobremesas</option>
          <option value="Lanches">Lanches</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      <div className="filtro-grupo">
        <label>Ordenar por</label>

        <select
          value={ordenacao}
          onChange={(e) => {
            setOrdenacao(e.target.value);
            setPaginaAtual;
          }}
        >
          <option value="relevancia">Mais relevantes</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
          <option value="preco-menor">Preço menor → maior</option>
          <option value="preco-maior">Preço maior → menor</option>
        </select>
      </div>
    </div>
  );
}

export default Filtros;
