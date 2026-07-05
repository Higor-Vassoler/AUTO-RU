import Layout from "../../components/layout/layout.jsx";
import "./sobre.css";

export default function SobreRU() {
  return (
    <Layout showSidebar={false}>
      <div className="sobre-ru">


        <div className="sobre-ru__header">
          <div>
            <h2 className="sobre-ru__title">Conheça o Seu RU</h2>
            <p className="sobre-ru__subtitle">Objetivo do trabalho</p>
          </div>
        </div>


        <div className="sobre-ru__hero">
          <p>O AutoRU se trata de um trabalho de BCC da matéria de Engenharia de Software ministrada pelo professor Igor Wiese, tivemos a ideia de fazer um site para o RU visando ajudar
            os alunos a comprar suas refeições e o funcionários a ter um serviço mais facilitado.</p>
        </div>

        <hr className="sobre-ru__divider" />


        <section className="sobre-ru__values">
          <h3 className="sobre-ru__section-title">Nossos Valores</h3>

          <div className="sobre-ru__values-grid">
            <div className="sobre-ru__value-card">
              <div className="sobre-ru__value-icon">🥗</div>
              <div>
                <h4 className="sobre-ru__value-heading">Qualidade Nutricional</h4>
                <p className="sobre-ru__value-text">Refeições balanceadas rigorosamente planejadas e supervisionadas por nutricionistas dedicados.</p>
              </div>
            </div>

            <div className="sobre-ru__value-card">
              <div className="sobre-ru__value-icon">🌱</div>
              <div>
                <h4 className="sobre-ru__value-heading">Sustentabilidade</h4>
                <p className="sobre-ru__value-text">Uso consciente de ingredientes locais e foco na redução ativa do desperdício de alimentos.</p>
              </div>
            </div>

            <div className="sobre-ru__value-card">
              <div className="sobre-ru__value-icon">🤝</div>
              <div>
                <h4 className="sobre-ru__value-heading">Acessibilidade</h4>
                <p className="sobre-ru__value-text">Preços subsidiados projetados para caber perfeitamente no orçamento diário do estudante.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
