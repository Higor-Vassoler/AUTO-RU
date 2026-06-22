import "./paginacao.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Paginacao({ paginaAtual, totalPaginas, onPaginaChange }) {
  const gerarPaginas = () => {
    const paginas = [];

    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }

      return paginas;
    }

    paginas.push(1);

    if (paginaAtual > 3) {
      paginas.push("...");
    }

    const inicio = Math.max(2, paginaAtual - 1);
    const fim = Math.min(totalPaginas - 1, paginaAtual + 1);

    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }

    if (paginaAtual < totalPaginas - 2) {
      paginas.push("...");
    }

    paginas.push(totalPaginas);

    return paginas;
  };

  return (
    <div className="paginacao">
      <button
        className="pagina-btn"
        disabled={paginaAtual === 1}
        onClick={() => onPaginaChange(paginaAtual - 1)}
      >
        <ChevronLeft size={18} />
      </button>

      {gerarPaginas().map((pagina, index) =>
        pagina === "..." ? (
          <span key={index} className="reticencias">
            ...
          </span>
        ) : (
          <button
            key={pagina}
            className={`pagina-btn ${paginaAtual === pagina ? "ativa" : ""}`}
            onClick={() => onPaginaChange(pagina)}
          >
            {pagina}
          </button>
        ),
      )}

      <button
        className="pagina-btn"
        disabled={paginaAtual === totalPaginas}
        onClick={() => onPaginaChange(paginaAtual + 1)}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default Paginacao;
