import "./footer.css";

import { Building2, Clock3, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-item">
        <Building2 size={42} className="footer-icon" />

        <div>
          <h3>Serviço de Refeitório Universitário</h3>
          <p>Alimentação de qualidade todos os dias.</p>
        </div>
      </div>

      <div className="footer-item">
        <Clock3 size={42} className="footer-icon" />

        <div>
          <h3>Horário de funcionamento</h3>
          <p>Segunda a sexta: 9h às 22h</p>
        </div>
      </div>

      <div className="footer-item">
        <Phone size={42} className="footer-icon" />

        <div>
          <h3>Dúvidas ou sugestões?</h3>
          <p>ru@universidade.edu.br</p>
        </div>
      </div>
    </footer>
  );
}
