import "./seus-pedidos.css";
import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import Paginacao from "../paginacao/paginacao";
import {
  formatarMoeda,
  formatarData,
} from "../../utils/formatadores/formatadores";

const PEDIDOS_POR_PAGINA = 5;

function ItemPedido({ pedido, ativo, onSelecionar }) {
  return (
    <button
      className={`pedido-item ${ativo ? "pedido-item--ativo" : ""}`}
      onClick={onSelecionar}
    >
      <div className="pedido-item-info">
        <span className="pedido-item-numero">Pedido #{pedido.numero}</span>
        <span className="pedido-item-data">{formatarData(pedido.data)}</span>
      </div>

      <div className="pedido-item-lado-direito">
        <span className="pedido-item-total">{formatarMoeda(pedido.total)}</span>
        <ChevronRight size={18} className="pedido-item-seta" />
      </div>
    </button>
  );
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

  return (
    <section className="seus-pedidos">
      <h2 className="seus-pedidos-titulo">Seus Pedidos</h2>

      <ul className="seus-pedidos-lista">
        {pedidosDaPagina.length === 0 && (
          <li className="pedidos-vazio">Nenhum pedido encontrado.</li>
        )}

        {pedidosDaPagina.map((pedido) => (
          <li key={pedido.id}>
            <ItemPedido
              pedido={pedido}
              ativo={pedido.id === pedidoSelecionadoId}
              onSelecionar={() => onSelecionarPedido(pedido.id)}
            />
          </li>
        ))}
      </ul>

      {totalPaginas > 1 && (
        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          onPaginaChange={setPaginaAtual}
        />
      )}
    </section>
  );
}
