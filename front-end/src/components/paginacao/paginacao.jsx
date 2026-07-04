import "./paginacao.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

function gerarPaginas(paginaAtual, totalPaginas) {
  if (totalPaginas <= 7) {
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  const paginas = [1];
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
}

export default function Paginacao({
  paginaAtual,
  totalPaginas,
  onPaginaChange,
}) {
  return (
    <div className="paginacao">
      <button
        className="pagina-btn"
        disabled={paginaAtual === 1}
        onClick={() => onPaginaChange(paginaAtual - 1)}
      >
        <ChevronLeft size={18} />
      </button>

      {gerarPaginas(paginaAtual, totalPaginas).map((pagina, index) =>
        pagina === "..." ? (
          <span key={`reticencias-${index}`} className="reticencias">
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
