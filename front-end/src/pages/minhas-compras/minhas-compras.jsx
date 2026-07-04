import "./minhas-compras.css";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import Layout from "../../components/layout/layout.jsx";
import SeusPedidos from "../../components/seus-pedidos/seus-pedidos.jsx";
import DetalhePedido from "../../components/detalhes-pedido/detalhes-pedidos.jsx";
import { pedidosMock } from "./mocks/pedidos-mocks.js";

export default function MinhasCompras() {
  const [pedidos] = useState(pedidosMock);
  const [pedidoSelecionadoId, setPedidoSelecionadoId] = useState(
    pedidosMock[0]?.id ?? null,
  );

  const pedidoSelecionado = pedidos.find(
    (pedido) => pedido.id === pedidoSelecionadoId,
  );

  const temPedidos = pedidos.length > 0;

  return (
    <Layout>
      <div className="minhas-compras">
        <header className="minhas-compras-cabecalho">
          <h1 className="minhas-compras-titulo">Minhas Compras</h1>
          <p className="minhas-compras-subtitulo">
            Acompanhe seus pedidos e veja os detalhes das suas compras.
          </p>
        </header>

        {temPedidos ? (
          <div className="minhas-compras-grid">
            <SeusPedidos
              pedidos={pedidos}
              pedidoSelecionadoId={pedidoSelecionadoId}
              onSelecionarPedido={setPedidoSelecionadoId}
            />

            {pedidoSelecionado && <DetalhePedido pedido={pedidoSelecionado} />}
          </div>
        ) : (
          <div className="minhas-compras-vazio">
            <div className="minhas-compras-vazio-icone">
              <ShoppingBag size={32} />
            </div>

            <p className="minhas-compras-vazio-titulo">
              Você ainda não fez nenhum pedido
            </p>
            <p className="minhas-compras-vazio-descricao">
              Quando realizar uma compra, ela aparecerá aqui.
            </p>

            <a className="minhas-compras-vazio-botao" href="/">
              Ver produtos
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}
