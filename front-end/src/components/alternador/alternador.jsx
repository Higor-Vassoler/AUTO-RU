import "./alternador.css";
import { Grid3X3, List } from "lucide-react";

const OPCOES_VISUALIZACAO = [
  {
    id: "grade",
    label: "Grade",
    icon: Grid3X3,
  },
  {
    id: "lista",
    label: "Lista",
    icon: List,
  },
];

function Alternador({ modoVisualizacao, onModoChange }) {
  return (
    <div className="alternador">
      {OPCOES_VISUALIZACAO.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`alternador-btn ${modoVisualizacao === id ? "alternador-btn--ativo" : ""}`}
          onClick={() => onModoChange(id)}
        >
          <Icon size={18} />
          {label}
        </button>
      ))}
    </div>
  );
}

export default Alternador;
