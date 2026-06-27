import React from 'react';
import Layout from "../../components/layout/layout.jsx"; 
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from 'react-router-dom';
import "./contato.css";

export default function ContatoRU() {
  return (
    <Layout showSidebar={false}>
      <div className="contato-ru">
        <div className="contato-ru__content">
          <div className="contato-ru__image-wrapper">
            <div className="contato-ru__image" />
          </div>
          

          <div className="contato-ru__info-wrapper">
            <h3 className="contato-ru__heading">Canais de Atendimento</h3>
            <p className="contato-ru__description">
              Entre em contato diretamente com a administração do Refeitório Universitário pelos canais oficiais listados abaixo.
            </p>

            <div className="contato-ru__cards-container">
              

              <div className="contato-ru__card">
                <div className="contato-ru__card-icon">
                  <Phone size={24} />
                </div>
                <div className="contato-ru__card-text">
                  <h4>Atendimento Telefônico</h4>
                  <p>(44) 3518-1234</p>
                  <span>Disponível em dias úteis, das 09h às 18h</span>
                </div>
              </div>


              <div className="contato-ru__card">
                <div className="contato-ru__card-icon">
                  <Mail size={24} />
                </div>
                <div className="contato-ru__card-text">
                  <h4>Suporte e Sugestões</h4>
                  <p>ru@universidade.edu.br</p>
                  <span>Retorno em até 24 horas úteis</span>
                </div>
              </div>


              <div className="contato-ru__card">
                <div className="contato-ru__card-icon">
                  <MapPin size={24} />
                </div>
                <div className="contato-ru__card-text">
                  <h4>Endereço Local</h4>
                  <p>Campus Universitário</p>
                  <span>Via Rosalina Maria dos Santos, 1233 (antiga Rodovia BR-369, km 0,5 - saída para Cascavel)</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        <hr className="contato-ru__divider" />

        <section className="contato-ru__faq">
          <h3 className="contato-ru__faq-title">Links Rápidos e Consultas Comuns</h3>
          <ul className="contato-ru__faq-list">
            <li><a href="/cardapio">Consultar o Cardápio de Hoje</a></li>
          </ul>
        </section>

      </div>
    </Layout>
  );
}