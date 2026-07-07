import React, { useState, useEffect } from "react";
import "./minhas-compras.css";
import { ShoppingBag } from "lucide-react";
import Layout from "../../components/layout/layout.jsx";
import SeusPedidos from "../../components/seus-pedidos/seus-pedidos.jsx";
import DetalhePedido from "../../components/detalhes-pedido/detalhes-pedidos.jsx";

export default function MinhasCompras() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionadoId, setPedidoSelecionadoId] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarMeusPedidos = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        const resposta = await fetch("http://localhost:5000/api/pedidos/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        const data = await resposta.json();

        if (data.sucesso) {
          setPedidos(data.dados);

          if (data.dados.length > 0) {
            setPedidoSelecionadoId(data.dados[0].id);
          }
        } else {
          console.error("Erro ao procurar pedidos:", data.mensagem);
        }
      } catch (erro) {
        console.error("Erro de ligação:", erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarMeusPedidos();
  }, []);

  const pedidoSelecionado = pedidos.find(
    (pedido) => pedido.id === pedidoSelecionadoId
  );

  const temPedidos = pedidos.length > 0;

  if (carregando) {
    return (
      <Layout>
        <div className="minhas-compras">
          <p style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-light)" }}>
            A carregar os seus pedidos...
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="minhas-compras">
        <header className="minhas-compras-cabecalho">
          <h1 className="minhas-compras-titulo">Minhas Compras</h1>
          <p className="minhas-compras-subtitulo">
            Acompanhe os seus pedidos e veja os detalhes das suas compras.
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
              Ainda não fez nenhum pedido
            </p>
            <p className="minhas-compras-vazio-descricao">
              Quando realizar uma compra, ela aparecerá aqui.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}