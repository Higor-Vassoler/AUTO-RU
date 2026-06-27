import React from 'react';
import Layout from "../../components/layout/layout.jsx"; 
import { Calendar, AlertTriangle, Globe, Award } from "lucide-react";
import "./cardapio.css";

export default function CardapioRU() {

  const cardapioDoDia = {
    data: "Sábado 27/06",
    tipo: "Almoço",
    itens: [
      { nome: "LASANHA DE FRANGO", tags: ["CG"] },
      { nome: "LASANHA DE ABOBRINHA", tags: [] },
      { nome: "ARROZ + ARROZ INTEGRAL", tags: [] },
      { nome: "FEIJÃO PRETO", tags: [] },
      { nome: "LEGUMES COZIDOS", tags: [] },
      { nome: "MIX DE FOLHAS", tags: ["V"] },
      { nome: "CENOURA RALADA", tags: ["V"] },
      { nome: "GELATINA", tags: ["CL"] },
      { nome: "SUCO + ÁGUA", tags: [] },
      { nome: "VINAGRETE", tags: ["V"] }
    ],
    observacao: "CARDÁPIO SUJEITO A ALTERAÇÕES",
    instagram: "@utfprcm",
    nutricionista: "RAYSSA ALVES PIMENTEL CRN8: 13.248"
  };

  return (
    <Layout showSidebar={false}> 
      <div className="cardapio-ru">
        
 
        <div className="cardapio-ru__header">
          <div>
            <h2 className="cardapio-ru__title">Cardápio do Campus</h2>
            <p className="cardapio-ru__subtitle">Veja as refeições planejadas para hoje</p>
          </div>
          
          <div className="cardapio-ru__date-badge">
            <Calendar size={20} />
            <span>{cardapioDoDia.data}</span>
          </div>
        </div>

        <div className="cardapio-ru__container">
          

          <div className="cardapio-ru__meal-section">
            <div className="cardapio-ru__meal-title">
              <h3>{cardapioDoDia.tipo}</h3>
            </div>


            <ul className="cardapio-ru__list">
              {cardapioDoDia.itens.map((item, index) => (
                <li key={index} className="cardapio-ru__item">
                  <span className="cardapio-ru__item-name">{item.nome}</span>
                  
                  <div className="cardapio-ru__tags">
                    {item.tags.includes("CG") && (
                      <span className="tag tag--cg" title="Contém Glúten">*CG</span>
                    )}
                    {item.tags.includes("CL") && (
                      <span className="tag tag--cl" title="Contém Lactose">*CL</span>
                    )}
                    {item.tags.includes("V") && (
                      <span className="tag tag--v" title="Vegano">🌱 Vegano</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="cardapio-ru__sidebar-info">
            
            <div className="cardapio-ru__info-card">
              <h4>Legenda de Alérgenos</h4>
              <ul className="cardapio-ru__legend-list">
                <li><span className="tag tag--cg">*CG</span> Contém Glúten</li>
                <li><span className="tag tag--cl">*CL</span> Contém Lactose</li>
                <li><span className="tag tag--v">🌱</span> Vegano</li>
              </ul>
            </div>

            <div className="cardapio-ru__info-card cardapio-ru__info-card--warning">
              <div className="cardapio-ru__info-card-header">
                <AlertTriangle size={20} />
                <h4>Aviso Importante</h4>
              </div>
              <p>{cardapioDoDia.observacao}</p>
            </div>

            <div className="cardapio-ru__info-card">
            <div className="cardapio-ru__info-card-header">
                <Globe size={20} />
                <h4>Siga o Campus para receber o cardapio da semana!</h4>
            </div>
              <a 
                href={`https://instagram.com/${cardapioDoDia.instagram.replace('@', '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="cardapio-ru__instagram-link"
              >
                {cardapioDoDia.instagram}
              </a>
            </div>

          </div>
        </div>


        <div className="cardapio-ru__footer-info">
          <Award size={18} />
          <span>Nutricionista RT Matriz: {cardapioDoDia.nutricionista}</span>
        </div>

      </div>
    </Layout>
  );
}