import "./alternador.css";
import { Grid3X3, List } from "lucide-react";

function Alternador({ modoVisualizacao, setModoVisualizacao }) {
  return (
    <div className="alternador">
      <button
        className={`alternador-btn ${
          modoVisualizacao === "grade" ? "ativo" : ""
        }`}
        onClick={() => setModoVisualizacao("grade")}
      >
        <Grid3X3 size={18} />
        Grade
      </button>

      <button
        className={`alternador-btn ${
          modoVisualizacao === "lista" ? "ativo" : ""
        }`}
        onClick={() => setModoVisualizacao("lista")}
      >
        <List size={18} />
        Lista
      </button>
    </div>
  );
}

export default Alternador;
