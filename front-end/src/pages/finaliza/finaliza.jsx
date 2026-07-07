import { useState, useContext } from 'react';
import Layout from "../../components/layout/layout.jsx";
import { CartContext } from "../../context/cart-context.js";
import './finaliza.css';

const Checkout = () => {
  const [cpf, setCpf] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [ticketId, setTicketId] = useState(null);

  const { cartItems, clearCart } = useContext(CartContext);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxaServico = 0.00;
  const totalGeral = subtotal + taxaServico;

  const handleConfirmarCompra = async () => {
    if (cartItems.length === 0) {
      alert("O seu carrinho está vazio.");
      return;
    }

    if (!cpf) {
      alert("Por favor, preencha o campo de Matrícula (RA).");
      return;
    }

    if (!metodoPagamento) {
      alert("Por favor, selecione um método de pagamento antes de continuar.");
      return;
    }

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      alert("Sessão expirada ou usuário não autenticado. Faça login novamente.");
      return;
    }

    const mapaPagamento = {
      'pix': 1,
      'cartao': 2,
      'dinheiro': 3
    };

    const itensFormatados = cartItems.map(item => ({
      id_produto: item.id || item.id_produto,
      quantidade: item.quantity || item.quantidade
    }));

    const payload = {
      ra: cpf,
      id_forma_pagamento: mapaPagamento[metodoPagamento],
      itens: itensFormatados
    };

    try {
      const response = await fetch("http://localhost:5000/api/pedidos/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setTicketId(data.dados.ticket_id);
        setCompraFinalizada(true);

        if (clearCart) {
          clearCart();
        }
      } else {
        alert(`Erro ao finalizar pedido: ${data.erro || data.mensagem}`);
      }
    } catch (error) {
      console.error("Erro na requisição de checkout:", error);
      alert("Erro ao comunicar com o servidor. Tente novamente.");
    }
  };

  if (compraFinalizada) {
    return (
      <Layout showSidebar={false} showHeader={true}>
        <div className="success-container">
          <div className="success-card">
            <h2>🎉 Pedido Realizado!</h2>
            <p>Sua compra foi processada com sucesso. Apresente o código abaixo ou o número do seu ticket na retirada.</p>

            {ticketId && (
              <div className="ticket-display">
                <h3>Ticket: #{ticketId}</h3>
              </div>
            )}

            <div className="qr-code-wrapper">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=Da nota pra gente professor😔"
                alt="QR Code Fictício" />
            </div>

            <button onClick={() => window.location.href = '/catalogo'} className="confirm-btn">
              Voltar para o Catálogo
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showSidebar={false} showHeader={true}>
      <div className="checkout-main">

        <section className="payment-section">
          <h2>Dados de Pagamento</h2>
          <div className="payment-card">
            <h3>Seção 1: Identificação</h3>

            <div className="form-group row">
              <div className="input-wrapper">
                <label>Matrícula (RA) *</label>
                <input
                  type="text"
                  placeholder="Ex: 123456"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
            </div>

            <h3 className="mt-large">Seção 2: Método de Pagamento</h3>
            <div className="payment-methods">
              <label className={`payment-method ${metodoPagamento === 'pix' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="pagamento"
                  value="pix"
                  checked={metodoPagamento === 'pix'}
                  onChange={(e) => setMetodoPagamento(e.target.value)}
                />
                <span>PIX</span>
              </label>

              <label className={`payment-method ${metodoPagamento === 'cartao' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="pagamento"
                  value="cartao"
                  checked={metodoPagamento === 'cartao'}
                  onChange={(e) => setMetodoPagamento(e.target.value)}
                />
                <span>Cartão de Crédito/Débito</span>
              </label>

              <label className={`payment-method ${metodoPagamento === 'dinheiro' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="pagamento"
                  value="dinheiro"
                  checked={metodoPagamento === 'dinheiro'}
                  onChange={(e) => setMetodoPagamento(e.target.value)}
                />
                <span>Dinheiro (Pagar no Caixa)</span>
              </label>
            </div>

            <div className="form-group mt-large">
              <textarea
                placeholder="Observações do Pedido"
                rows="4"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              ></textarea>
            </div>
          </div>
        </section>

        <section className="summary-section">
          <div className="summary-card">
            <h2>Resumo do Pedido ({cartItems.length} itens)</h2>

            <div className="items-list">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="item-image" style={{ background: 'transparent' }}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', backgroundColor: '#eee', borderRadius: '8px' }}></div>
                    )}
                  </div>
                  <div className="item-details">
                    <span className="item-name">{item.name || item.nome}</span>
                    <span className="item-qty-price">x{item.quantity} - R$ {Number(item.price || 0).toFixed(2)}</span>
                  </div>
                  <div className="item-total">
                    <strong>R$ {(item.quantity * Number(item.price || 0)).toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="totals-section">
              <div className="totals-row">
                <span>Subtotal:</span>
                <span className="dots"></span>
                <strong>R$ {subtotal.toFixed(2)}</strong>
              </div>
              <div className="totals-row">
                <span>Taxa de Serviço:</span>
                <span className="dots"></span>
                <span>R$ {taxaServico.toFixed(2)}</span>
              </div>

              <div className="totals-row grand-total">
                <span>Total Geral:</span>
                <span className="dots"></span>
                <strong className="highlight">R$ {totalGeral.toFixed(2)}</strong>
              </div>
            </div>

            <button className="confirm-btn" onClick={handleConfirmarCompra}>
              Confirmar e Pagar R$ {totalGeral.toFixed(2)}
            </button>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Checkout;