import "./seus-pedidos.css";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PEDIDOS_POR_PAGINA = 5;

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(dataISO) {
  return new Date(dataISO).toLocaleDateString("pt-BR");
}

export default function SeusPedidos({
  pedidos,
  pedidoSelecionadoId,
  onSelecionarPedido,
}) {
  const [paginaAtual, setPaginaAtual] = useState(1);

  const totalPaginas = Math.max(
    1,
    Math.ceil(pedidos.length / PEDIDOS_POR_PAGINA),
  );

  const pedidosDaPagina = useMemo(() => {
    const inicio = (paginaAtual - 1) * PEDIDOS_POR_PAGINA;
    return pedidos.slice(inicio, inicio + PEDIDOS_POR_PAGINA);
  }, [pedidos, paginaAtual]);

  const irParaPaginaAnterior = () => {
    setPaginaAtual((pagina) => Math.max(1, pagina - 1));
  };

  const irParaProximaPagina = () => {
    setPaginaAtual((pagina) => Math.min(totalPaginas, pagina + 1));
  };

  return (
    <section className="seus-pedidos">
      <h2 className="seus-pedidos-titulo">Seus Pedidos</h2>

      <ul className="seus-pedidos-lista">
        {pedidosDaPagina.map((pedido) => (
          <li key={pedido.id}>
            <button
              className={
                pedido.id === pedidoSelecionadoId
                  ? "pedido-item pedido-item--ativo"
                  : "pedido-item"
              }
              onClick={() => onSelecionarPedido(pedido.id)}
            >
              <div className="pedido-item-info">
                <span className="pedido-item-numero">
                  Pedido #{pedido.numero}
                </span>
                <span className="pedido-item-data">
                  {formatarData(pedido.data)}
                </span>
              </div>

              <div className="pedido-item-lado-direito">
                <span className="pedido-item-total">
                  {formatarMoeda(pedido.total)}
                </span>
                <ChevronRight size={18} className="pedido-item-seta" />
              </div>
            </button>
          </li>
        ))}

        {pedidosDaPagina.length === 0 && (
          <li className="pedidos-vazio">Nenhum pedido encontrado.</li>
        )}
      </ul>

      {totalPaginas > 1 && (
        <nav className="paginacao" aria-label="Paginação de pedidos">
          <button
            className="paginacao-botao"
            onClick={irParaPaginaAnterior}
            disabled={paginaAtual === 1}
          >
            <ChevronLeft size={16} />
            Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, indice) => indice + 1).map(
            (numeroPagina) => (
              <button
                key={numeroPagina}
                className={
                  numeroPagina === paginaAtual
                    ? "paginacao-numero paginacao-numero--ativo"
                    : "paginacao-numero"
                }
                onClick={() => setPaginaAtual(numeroPagina)}
              >
                {numeroPagina}
              </button>
            ),
          )}

          <button
            className="paginacao-botao"
            onClick={irParaProximaPagina}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima
            <ChevronRight size={16} />
          </button>
        </nav>
      )}
    </section>
  );
}
