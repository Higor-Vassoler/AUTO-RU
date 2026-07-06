import React, { useState } from "react";
import { Search, UserPlus, Edit2, Shield, Trash2, X } from "lucide-react";
import Layout from "../../components/layout/layout.jsx"; 
import "./usuarios.css";

const usuariosIniciais = [
  { id: 1, nome: "Admin", email: "admin@admin.com", matricula: "999999", permissao: "Administrador" },
  { id: 2, nome: "Usuario 1", email: "usuario1@alunos.utfpr.edu.br", matricula: "231045", permissao: "Usuário" },
  { id: 3, nome: "Usuario 2", email: "usuario2@utfpr.edu.br", matricula: "104857", permissao: "Usuário" },
  { id: 4, nome: "Usuario 3", email: "usuario3@alunos.utfpr.edu.br", matricula: "241022", permissao: "Usuário" },
];

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(usuariosIniciais);
  const [busca, setBusca] = useState("");
  
  // Controle de Modais: null | 'cadastro' | 'edicao' | 'permissao'
  const [modalAberto, setModalAberto] = useState(null); 
  
  // Estado para armazenar os dados do formulário atual
  const [usuarioAtual, setUsuarioAtual] = useState({
    id: null,
    nome: "",
    email: "",
    matricula: "",
    senha: "",
    permissao: "Usuário"
  });

  const handleBuscar = (e) => setBusca(e.target.value);

  // Abertura e Fechamento de Modais
  const fecharModal = () => {
    setModalAberto(null);
    setUsuarioAtual({ id: null, nome: "", email: "", matricula: "", senha: "", permissao: "Usuário" });
  };

  const abrirModalCadastro = () => {
    setUsuarioAtual({ id: null, nome: "", email: "", matricula: "", senha: "", permissao: "Usuário" });
    setModalAberto("cadastro");
  };

  const abrirModalEdicao = (user) => {
    setUsuarioAtual({ ...user, senha: "" }); // Carrega dados do usuário (senha vazia por segurança)
    setModalAberto("edicao");
  };

  const abrirModalPermissao = (user) => {
    // Se o usuário tiver permissões diferentes (ex: Editor), forçamos pro fallback ou mantém Adm/Usuário
    setUsuarioAtual(user);
    setModalAberto("permissao");
  };

  // Lida com a digitação nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioAtual((prev) => ({ ...prev, [name]: value }));
  };

  // Submissões de Formulário unificadas
  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalAberto === "cadastro") {
      const novoUsuario = {
        id: Date.now(),
        nome: usuarioAtual.nome,
        email: usuarioAtual.email,
        matricula: usuarioAtual.matricula,
        permissao: "Usuário", 
      };
      setUsuarios([...usuarios, novoUsuario]);

    } else if (modalAberto === "edicao" || modalAberto === "permissao") {
      setUsuarios(
        usuarios.map((u) => 
          u.id === usuarioAtual.id 
            ? { ...u, nome: usuarioAtual.nome, email: usuarioAtual.email, matricula: usuarioAtual.matricula, permissao: usuarioAtual.permissao } 
            : u
        )
      );
    }
    fecharModal();
  };

  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário definitivamente?")) {
      setUsuarios(usuarios.filter((user) => user.id !== id));
    }
  };

  const usuariosFiltrados = usuarios.filter(
    (user) =>
      user.nome.toLowerCase().includes(busca.toLowerCase()) ||
      user.email.toLowerCase().includes(busca.toLowerCase()) ||
      user.matricula.includes(busca)
  );

  return (
    <Layout>
      <div className="usuarios-container">
        <div className="usuarios-page-header">
          <div>
            <h1 className="usuarios-page-title">Gerenciamento de Usuários</h1>
            <p className="usuarios-page-subtitle">Visualize, cadastre e gerencie as permissões dos usuários do RU.</p>
          </div>
          <button className="btn-primary-yellow" onClick={abrirModalCadastro}>
            <UserPlus size={16} />
            Cadastrar Novo Usuário
          </button>
        </div>

        <div className="usuarios-admin-card">
          <div className="usuarios-search-container">
            <Search size={18} className="usuarios-search-icon" />
            <input
              type="text"
              className="usuarios-search-input"
              placeholder="Pesquisar usuários por nome, e-mail ou matrícula"
              value={busca}
              onChange={handleBuscar}
            />
          </div>

          <div className="usuarios-table-wrapper">
            <table className="usuarios-user-table">
              <thead>
                <tr>
                  <th>Nome Completo</th>
                  <th>E-mail</th>
                  <th>Matrícula</th>
                  <th>Permissão</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.length > 0 ? (
                  usuariosFiltrados.map((user) => (
                    <tr key={user.id}>
                      <td className="usuarios-user-name">{user.nome}</td>
                      <td>{user.email}</td>
                      <td>{user.matricula}</td>
                      <td>
                        <span className={`usuarios-badge usuarios-badge-${user.permissao.toLowerCase()}`}>
                          {user.permissao}
                        </span>
                      </td>
                      <td>
                        <div className="usuarios-actions-group">
                          <button 
                            className="usuarios-btn-action usuarios-btn-edit" 
                            onClick={() => abrirModalEdicao(user)}
                          >
                            <Edit2 size={14} /> Editar Dados
                          </button>
                          <button 
                            className="usuarios-btn-action usuarios-btn-perm" 
                            onClick={() => abrirModalPermissao(user)}
                          >
                            <Shield size={14} /> Permissões
                          </button>
                          <button 
                            className="usuarios-btn-action usuarios-btn-delete" 
                            onClick={() => handleExcluir(user.id)}
                            title="Excluir Usuário"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "40px", color: "#888" }}>
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= MODAL CENTRAL ================= */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                {modalAberto === "cadastro" && "Cadastrar Novo Usuário"}
                {modalAberto === "edicao" && "Editar Dados do Usuário"}
                {modalAberto === "permissao" && "Gerenciar Permissões"}
              </h2>
              <button className="modal-close-btn" onClick={fecharModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              
              {/* CAMPOS PARA CADASTRO E EDIÇÃO */}
              {(modalAberto === "cadastro" || modalAberto === "edicao") && (
                <>
                  <div className="input-group">
                    <label>Nome Completo</label>
                    <input type="text" name="nome" placeholder="Ex: Maria Silva" value={usuarioAtual.nome} onChange={handleInputChange} required />
                  </div>

                  <div className="input-group">
                    <label>E-mail</label>
                    <input type="email" name="email" placeholder="email@exemplo.com" value={usuarioAtual.email} onChange={handleInputChange} required />
                  </div>

                  <div className="modal-row">
                    <div className="input-group">
                      <label>Matrícula</label>
                      <input type="text" name="matricula" placeholder="Ex: 123456" value={usuarioAtual.matricula} onChange={handleInputChange} required />
                    </div>

                    {/* Senha só é obrigatória/exibida no cadastro */}
                    {modalAberto === "cadastro" && (
                      <div className="input-group">
                        <label>Senha</label>
                        <input type="password" name="senha" placeholder="Crie uma senha" value={usuarioAtual.senha} onChange={handleInputChange} required />
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* CAMPOS APENAS PARA PERMISSÕES */}
              {modalAberto === "permissao" && (
                <div className="input-group">
                  <label>Nível de Acesso (Administrador)</label>
                  <select name="permissao" value={usuarioAtual.permissao} onChange={handleInputChange} required>
                    <option value="Usuário">Usuário Comum</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                  <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                    Administradores possuem controle total sobre o catálogo, cardápio e permissões do sistema.
                  </p>
                </div>
              )}

              <div className="modal-footer">
                <button type="button" className="btn-modal-cancelar" onClick={fecharModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary-yellow">
                  {modalAberto === "cadastro" && "Cadastrar Usuário"}
                  {modalAberto === "edicao" && "Salvar Alterações"}
                  {modalAberto === "permissao" && "Atualizar Permissão"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}