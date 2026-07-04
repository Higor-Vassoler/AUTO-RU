import React, { useState, useContext } from 'react';
import Layout from "../../components/layout/layout.jsx"; 
import { CartContext } from "../../pages/carrinho/ConteudoCarrinho.jsx";
import './finaliza.css';

const Checkout = () => {
  const [cpf, setCpf] = useState('');
  const [notaFiscal, setNotaFiscal] = useState(false);
  const [observacoes, setObservacoes] = useState('');

  const { cartItems } = useContext(CartContext);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxaServico = 0.00;
  const totalGeral = subtotal + taxaServico;

  return (
    <Layout showSidebar={false} showHeader={true}>
      <div className="checkout-main">
        
        <section className="payment-section">
          <h2>Dados de Pagamento</h2>
          <div className="payment-card">
            <h3>Seção 1: Identificação</h3>
            
            <div className="form-group row">
              <div className="input-wrapper">
                <label>CPF / Matrícula</label>
                <input 
                  type="text" 
                  placeholder="Nome ou Matrícula" 
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
              <div className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  id="nota-fiscal"
                  checked={notaFiscal}
                  onChange={(e) => setNotaFiscal(e.target.checked)}
                />
                <label htmlFor="nota-fiscal">Solicitar Nota Fiscal</label>
              </div>
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
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                  </div>
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty-price">x{item.quantity} - R$ {item.price.toFixed(2)}</span>
                  </div>
                  <div className="item-total">
                    <strong>R$ {(item.quantity * item.price).toFixed(2)}</strong>
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

            <button className="confirm-btn">
              Confirmar e Pagar R$ {totalGeral.toFixed(2)}
            </button>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Checkout;