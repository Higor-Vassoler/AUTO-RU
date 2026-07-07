import React, { useState, useEffect } from "react";
import { Search, UserPlus, Edit2, Shield, Trash2, X } from "lucide-react";
import Layout from "../../components/layout/layout.jsx";
import "./usuarios.css";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(null);
  const [usuarioAtual, setUsuarioAtual] = useState({
    id: null,
    nome: "",
    email: "",
    matricula: "",
    senha: "",
    permissao: "Usuário",
  });

  const buscarUsuariosNoBanco = async (termoDeBusca) => {
    try {
      const url = termoDeBusca
        ? `http://localhost:5000/api/usuarios/pesquisa?q=${termoDeBusca}`
        : `http://localhost:5000/api/usuarios`;

      const resposta = await fetch(url);
      const data = await resposta.json();

      if (data.sucesso) {
        const usuariosFormatados = data.dados.map(user => ({
          id: user.id,
          nome: user.nome,
          email: user.email,
          matricula: user.ra ? String(user.ra) : "",
          permissao: user.is_admin ? "Administrador" : "Usuário"
        }));
        setUsuarios(usuariosFormatados);
      }
    } catch (erro) {
      console.error("Erro ao conectar com o backend:", erro);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      buscarUsuariosNoBanco(busca);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [busca]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioAtual({ ...usuarioAtual, [name]: value });
  };

  const abrirModalCadastro = () => {
    setUsuarioAtual({ id: null, nome: "", email: "", matricula: "", senha: "", permissao: "Usuário" });
    setModalAberto("cadastro");
  };

  const abrirModalEdicao = (user) => {
    setUsuarioAtual({ ...user, senha: "" });
    setModalAberto("edicao");
  };

  const abrirModalPermissao = (user) => {
    setUsuarioAtual({ ...user });
    setModalAberto("permissao");
  };

  const fecharModal = () => {
    setModalAberto(null);
    setUsuarioAtual({ id: null, nome: "", email: "", matricula: "", senha: "", permissao: "Usuário" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modalAberto === "edicao") {
      try {
        const resposta = await fetch(`http://localhost:5000/api/usuarios/${usuarioAtual.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: usuarioAtual.nome,
            email: usuarioAtual.email,
            ra: usuarioAtual.matricula ? Number(usuarioAtual.matricula) : null,
          }),
        });

        const data = await resposta.json();

        if (data.sucesso) {
          alert("Usuário atualizado com sucesso!");
          buscarUsuariosNoBanco(busca);
          fecharModal();
        } else {
          alert("Erro ao atualizar: " + data.erro);
        }
      } catch (erro) {
        console.error("Erro na edição:", erro);
        alert("Erro de conexão com o servidor.");
      }
    }

    if (modalAberto === "permissao") {
      try {
        const isAdmin = usuarioAtual.permissao === "Administrador";

        const resposta = await fetch(`http://localhost:5000/api/usuarios/${usuarioAtual.id}/permissao`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_admin: isAdmin }),
        });

        const data = await resposta.json();

        if (data.sucesso) {
          alert("Permissão atualizada com sucesso!");
          buscarUsuariosNoBanco(busca);
          fecharModal();
        } else {
          alert("Erro ao atualizar permissão: " + data.erro);
        }
      } catch (erro) {
        console.error("Erro na permissão:", erro);
        alert("Erro de conexão com o servidor.");
      }
    }
  };

  const deletarUsuario = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir permanentemente este usuário?")) {
      try {
        const resposta = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
          method: "DELETE",
        });

        const data = await resposta.json();

        if (data.sucesso) {
          buscarUsuariosNoBanco(busca);
        } else {
          alert("Erro ao excluir: " + (data.erro || data.mensagem));
        }
      } catch (erro) {
        console.error("Erro ao deletar usuário:", erro);
        alert("Erro de conexão com o servidor.");
      }
    }
  };

  return (
    <Layout>
      <div className="usuarios-container">
        <div className="usuarios-page-header">
          <div>
            <h1 className="usuarios-page-title">Gerenciamento de Usuários</h1>
            <p className="usuarios-page-subtitle">Visualize, pesquise, edite permissões ou remova usuários do sistema.</p>
          </div>
          <button className="btn-primary-yellow" onClick={abrirModalCadastro}>
            <UserPlus size={20} />
            Novo Usuário
          </button>
        </div>

        <div className="busca-wrapper">
          <Search className="busca-icon" size={20} />
          <input
            type="text"
            placeholder="Pesquise por nome ou e-mail."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="busca-input"
          />
          {busca && (
            <button className="busca-limpar" onClick={() => setBusca("")}>
              <X size={18} />
            </button>
          )}
        </div>

        <div className="tabela-card">
          <table className="usuarios-tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Matrícula (RA)</th>
                <th>Nível de Acesso</th>
                <th style={{ textAlign: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>
                      <div className="usuario-info-nome">{usuario.nome}</div>
                    </td>
                    <td>{usuario.email}</td>
                    <td>
                      <span className="txt-matricula">{usuario.matricula || "Não informado"}</span>
                    </td>
                    <td>
                      <span className={`badge-permissao ${usuario.permissao === "Administrador" ? "admin" : "user"}`}>
                        {usuario.permissao}
                      </span>
                    </td>
                    <td>
                      <div className="acoes-botoes">
                        <button className="btn-acao editar" title="Editar Usuário" onClick={() => abrirModalEdicao(usuario)}>
                          <Edit2 size={16} />
                        </button>
                        <button className="btn-acao permissao" title="Alterar Permissão" onClick={() => abrirModalPermissao(usuario)}>
                          <Shield size={16} />
                        </button>
                        <button className="btn-acao deletar" title="Excluir Usuário" onClick={() => deletarUsuario(usuario.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "32px", color: "#666" }}>
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                {modalAberto === "cadastro" && "Cadastrar Novo Usuário"}
                {modalAberto === "edicao" && "Editar Dados do Usuário"}
                {modalAberto === "permissao" && "Alterar Nível de Acesso"}
              </h2>
              <button className="btn-fechar-modal" onClick={fecharModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {modalAberto !== "permissao" && (
                <>
                  <div className="input-group">
                    <label>Nome Completo</label>
                    <input type="text" name="nome" value={usuarioAtual.nome} onChange={handleInputChange} required placeholder="Ex: João Silva" />
                  </div>

                  <div className="input-group">
                    <label>E-mail institucional</label>
                    <input type="email" name="email" value={usuarioAtual.email} onChange={handleInputChange} required placeholder="Ex: joao@alunos.utfpr.edu.br" />
                  </div>

                  <div className="input-grid">
                    <div className="input-group">
                      <label>Matrícula (RA)</label>
                      <input type="text" name="matricula" value={usuarioAtual.matricula} onChange={handleInputChange} required placeholder="Ex: 231045" />
                    </div>

                    {modalAberto === "cadastro" && (
                      <div className="input-group">
                        <label>Senha Provisória</label>
                        <input type="password" name="senha" value={usuarioAtual.senha} onChange={handleInputChange} required placeholder="Mínimo 8 caracteres" />
                      </div>
                    )}
                  </div>
                </>
              )}

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