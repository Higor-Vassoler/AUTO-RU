import React, { useState } from "react";
import { Search, UserPlus, Edit2, Shield, Trash2, X } from "lucide-react";
import Layout from "../../components/layout/layout.jsx"; 
import "./usuarios.css";

const usuariosIniciais = [
  { id: 1, nome: "Admin Geral", email: "admin@admin.com", matricula: "999999", permissao: "Administrador" },
  { id: 2, nome: "João Silva", email: "joao.silva@alunos.utfpr.edu.br", matricula: "231045", permissao: "Usuário" },
  { id: 3, nome: "Maria Souza", email: "maria.souza@utfpr.edu.br", matricula: "104857", permissao: "Editor" },
  { id: 4, nome: "Carlos Eduardo", email: "cadu@alunos.utfpr.edu.br", matricula: "241022", permissao: "Usuário" },
];

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(usuariosIniciais);
  const [busca, setBusca] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    matricula: "",
    senha: "",
  });

  const handleBuscar = (e) => setBusca(e.target.value);

  const abrirModal = () => setIsModalOpen(true);
  const fecharModal = () => {
    setIsModalOpen(false);
    setNovoUsuario({ nome: "", email: "", matricula: "", senha: "" }); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitCadastro = (e) => {
    e.preventDefault();

    const novoUsuarioCompleto = {
      id: Date.now(),
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      matricula: novoUsuario.matricula,
      permissao: "Usuário",
    };
    
    setUsuarios([...usuarios, novoUsuarioCompleto]);
    fecharModal();
  };

  const handleEditarDados = (id) => alert(`Ação: Editar dados do usuário ID: ${id}`);
  const handlePermissoes = (id) => alert(`Ação: Alterar permissões do usuário ID: ${id}`);
  
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
          <button className="btn-primary-yellow" onClick={abrirModal}>
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
              placeholder="Pesquisar usuários por nome, e-mail ou matrícula..."
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
                          <button className="usuarios-btn-action usuarios-btn-edit" onClick={() => handleEditarDados(user.id)}>
                            <Edit2 size={14} /> Editar Dados
                          </button>
                          <button className="usuarios-btn-action usuarios-btn-perm" onClick={() => handlePermissoes(user.id)}>
                            <Shield size={14} /> Permissões
                          </button>
                          <button className="usuarios-btn-action usuarios-btn-delete" onClick={() => handleExcluir(user.id)} title="Excluir Usuário">
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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Cadastrar Novo Usuário</h2>
              <button className="modal-close-btn" onClick={fecharModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitCadastro} className="modal-form">
              <div className="input-group">
                <label>Nome Completo</label>
                <input type="text" name="nome" placeholder="Ex: Maria Silva" value={novoUsuario.nome} onChange={handleInputChange} required />
              </div>

              <div className="input-group">
                <label>E-mail</label>
                <input type="email" name="email" placeholder="email@exemplo.com" value={novoUsuario.email} onChange={handleInputChange} required />
              </div>

              <div className="modal-row">
                <div className="input-group">
                  <label>Matrícula</label>
                  <input type="text" name="matricula" placeholder="Ex: 123456" value={novoUsuario.matricula} onChange={handleInputChange} required />
                </div>

                <div className="input-group">
                  <label>Senha</label>
                  <input type="password" name="senha" placeholder="Crie uma senha" value={novoUsuario.senha} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-modal-cancelar" onClick={fecharModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary-yellow">
                  Cadastrar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}