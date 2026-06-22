import "./barra-pesquisa.css";
import { Search } from "lucide-react";

function BarraPesquisa({ valorBusca, setValorBusca, onBuscar }) {
  return (
    <div className="barra-pesquisa">
      <div className="input-container">
        <Search size={18} className="icone-busca" />

        <input
          type="text"
          placeholder="Buscar produtos..."
          value={valorBusca}
          onChange={(e) => setValorBusca(e.target.value)}
        />
      </div>

      <button className="btn-buscar" onClick={onBuscar}>
        Buscar
      </button>
    </div>
  );
}

export default BarraPesquisa;
