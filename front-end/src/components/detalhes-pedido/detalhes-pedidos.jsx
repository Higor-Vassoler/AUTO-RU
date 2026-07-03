import "./detalhes-pedidos.css";

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarDataHora(dataISO) {
  const data = new Date(dataISO);
  const dataFormatada = data.toLocaleDateString("pt-BR");
  const horaFormatada = data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dataFormatada} às ${horaFormatada}`;
}

export default function DetalhePedido({ pedido }) {
  const subtotal = pedido.itens.reduce(
    (acumulado, item) => acumulado + item.precoUnitario * item.quantidade,
    0,
  );

  return (
    <section className="detalhe-pedido">
      <header className="detalhe-pedido-cabecalho">
        <div>
          <h2 className="detalhe-pedido-numero">Pedido #{pedido.numero}</h2>
          <p className="detalhe-pedido-data">
            Realizado em {formatarDataHora(pedido.data)}
          </p>
        </div>

        <div className="detalhe-pedido-total-cabecalho">
          <span className="detalhe-pedido-total-label">Total do pedido</span>
          <span className="detalhe-pedido-total-valor">
            {formatarMoeda(pedido.total)}
          </span>
        </div>
      </header>

      <h3 className="detalhe-pedido-subtitulo">Produtos do Pedido</h3>

      <table className="detalhe-pedido-tabela">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {pedido.itens.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="detalhe-pedido-produto">
                  <img src={item.imagem} alt={item.nome} />
                  <span>{item.nome}</span>
                </div>
              </td>
              <td>{item.quantidade}</td>
              <td>{formatarMoeda(item.precoUnitario)}</td>
              <td>{formatarMoeda(item.precoUnitario * item.quantidade)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="detalhe-pedido-resumo">
        <div className="detalhe-pedido-resumo-linha">
          <span>Subtotal</span>
          <span>{formatarMoeda(subtotal)}</span>
        </div>
        <div className="detalhe-pedido-resumo-linha">
          <span>Taxa de Serviço</span>
          <span>{formatarMoeda(pedido.taxaServico ?? 0)}</span>
        </div>
        <div className="detalhe-pedido-resumo-linha detalhe-pedido-resumo-linha--total">
          <span>Total</span>
          <span>{formatarMoeda(subtotal + (pedido.taxaServico ?? 0))}</span>
        </div>
      </div>
    </section>
  );
}
