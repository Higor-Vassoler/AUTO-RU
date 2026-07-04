import "./filtros.css";
import {
  LayoutGrid,
  UtensilsCrossed,
  CupSoda,
  CakeSlice,
  Sandwich,
} from "lucide-react";

const categorias = [
  {
    nome: "Todas",
    icone: <LayoutGrid size={16} />,
  },
  {
    nome: "Refeições",
    icone: <UtensilsCrossed size={16} />,
  },
  {
    nome: "Bebidas",
    icone: <CupSoda size={16} />,
  },
  {
    nome: "Doces",
    icone: <CakeSlice size={16} />,
  },
  {
    nome: "Lanches",
    icone: <Sandwich size={16} />,
  }
];

function Filtros({
  categoriaSelecionada,
  setCategoriaSelecionada,
  setPaginaAtual,
  ordenacao,
  setOrdenacao,
}) {
  return (
    <div className="filtros">
      <div className="categorias-container">
        {categorias.map((categoria) => (
          <button
            key={categoria.nome}
            className={
              categoriaSelecionada === categoria.nome
                ? "categoria-btn ativo"
                : "categoria-btn"
            }
            onClick={() => {
              setCategoriaSelecionada(categoria.nome);
              setPaginaAtual(1);
            }}
          >
            {categoria.icone}
            <span>{categoria.nome}</span>
          </button>
        ))}
      </div>

      <div className="filtro-grupo">
        <label>Ordenar por</label>

        <select
          value={ordenacao}
          onChange={(e) => {
            setOrdenacao(e.target.value);
            setPaginaAtual(1);
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
