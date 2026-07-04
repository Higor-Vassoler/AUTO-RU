import "./detalhes-pedidos.css";
import {
  formatarMoeda,
  formatarDataHora,
} from "../../utils/formatadores/formatadores";

function calcularSubtotal(itens) {
  return itens.reduce(
    (soma, item) => soma + item.precoUnitario * item.quantidade,
    0,
  );
}

function LinhaItemPedido({ item }) {
  return (
    <tr>
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
  );
}

function ResumoPedido({ subtotal, taxaServico }) {
  return (
    <div className="detalhe-pedido-resumo">
      <div className="detalhe-pedido-resumo-linha">
        <span>Subtotal</span>
        <span>{formatarMoeda(subtotal)}</span>
      </div>

      <div className="detalhe-pedido-resumo-linha">
        <span>Taxa de Serviço</span>
        <span>{formatarMoeda(taxaServico)}</span>
      </div>

      <div className="detalhe-pedido-resumo-linha detalhe-pedido-resumo-linha--total">
        <span>Total</span>
        <span>{formatarMoeda(subtotal + taxaServico)}</span>
      </div>
    </div>
  );
}

export default function DetalhePedido({ pedido }) {
  const { numero, data, total, taxaServico = 0, itens } = pedido;
  const subtotal = calcularSubtotal(itens);

  return (
    <section className="detalhe-pedido">
      <header className="detalhe-pedido-cabecalho">
        <div>
          <h2 className="detalhe-pedido-numero">Pedido #{numero}</h2>
          <p className="detalhe-pedido-data">
            Realizado em {formatarDataHora(data)}
          </p>
        </div>

        <div className="detalhe-pedido-total-cabecalho">
          <span className="detalhe-pedido-total-label">Total do pedido</span>
          <span className="detalhe-pedido-total-valor">
            {formatarMoeda(total)}
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
          {itens.map((item) => (
            <LinhaItemPedido key={item.id} item={item} />
          ))}
        </tbody>
      </table>

      <ResumoPedido subtotal={subtotal} taxaServico={taxaServico} />
    </section>
  );
}
