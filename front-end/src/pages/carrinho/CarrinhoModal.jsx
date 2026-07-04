import React from 'react';
import './CarrinhoModal.css';

const CartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity }) => {

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>Meu Carrinho ({cartItems.length} itens)</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <p className="item-price">x{item.quantity} - R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="modal-footer">
          <div className="subtotal-container">
            <span>Subtotal:</span>
            <strong>R$ {subtotal.toFixed(2)}</strong>
          </div>
          
          <button 
            className="checkout-button" 
            onClick={() => {
              onClose(); 
              window.location.href = '/finaliza';
            }}
          >
            Finalizar Compra
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartModal;