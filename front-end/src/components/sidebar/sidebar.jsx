import "./sidebar.css";

import { User, Shield, Bell, Heart, Package, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Configurações</h2>

      <ul>
        <li>
          <User size={20} />
          Meu Perfil
        </li>

        <li>
          <Shield size={20} />
          Segurança
        </li>

        <li>
          <Bell size={20} />
          Notificações
        </li>

        <li>
          <Heart size={20} />
          Favoritos
        </li>

        <li className="active">
          <Package size={20} />
          Produtos
        </li>
      </ul>

      <div className="logout">
        <LogOut size={20} />

        <span>Sair da Conta</span>
      </div>
    </aside>
  );
}
