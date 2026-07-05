import { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import "./style.css";

import {
  User,
  Shield,
  Trash2,
  Pencil,
  X,
  Eye,
  EyeOff
} from "lucide-react";

export default function Perfil() {
  const [editando, setEditando] = useState(false);
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    ra: ""
  });

  const [modalSenhaAberto, setModalSenhaAberto] = useState(false);
  const [dadosSenha, setDadosSenha] = useState({ novaSenha: "", confirmarSenha: "" });
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  useEffect(() => {
    const buscarDadosUsuario = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token não encontrado no localStorage");
          return;
        }

        const resposta = await fetch("http://localhost:5000/api/usuarios/me", {
          method: "GET",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json"
          }
        });

        const respostaJson = await resposta.json();

        if (resposta.ok) {
          const usuarioData = respostaJson.dados;

          setUsuario({
            nome: usuarioData.nome || "",
            email: usuarioData.email || "",
            ra: usuarioData.ra || ""
          });
        } else {
          console.error("Erro ao buscar dados do usuário:", respostaJson.erro);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    buscarDadosUsuario();
  }, []);

  const handleExcluirConta = async () => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão perdidos.");
    if (!confirmacao) return;

    try {
      const token = localStorage.getItem("token");
      const resposta = await fetch("http://localhost:5000/api/usuarios/me", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });
      const dadosResposta = await resposta.json();
      if (resposta.ok) {
        alert(dadosResposta.mensagem);
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        alert("Erro ao excluir conta: " + (dadosResposta.erro || "Falha desconhecida."));
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value
    });
  };

  const handleSenhaChange = (e) => {
    const { name, value } = e.target;
    setDadosSenha({ ...dadosSenha, [name]: value });
  };

  const handleConfirmarSenha = () => {
    if (dadosSenha.novaSenha !== dadosSenha.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    console.log("Enviando requisição de troca de senha:", dadosSenha);

    alert("Senha alterada com sucesso!");
    fecharModalSenha();
  };

  const fecharModalSenha = () => {
    setModalSenhaAberto(false);
    setDadosSenha({ novaSenha: "", confirmarSenha: "" });
    setMostrarNovaSenha(false);
    setMostrarConfirmarSenha(false);
  };

  const editarDados = () => setEditando(true);

  const cancelarEdicao = () => {
    setEditando(false);
    window.location.reload();
  };

  const salvarDados = async () => {
    try {
      const token = localStorage.getItem("token");

      const resposta = await fetch("http://localhost:5000/api/usuarios/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(usuario)
      });

      const dadosResposta = await resposta.json();

      if (resposta.ok) {
        alert(dadosResposta.mensagem || "Dados atualizados com sucesso!");
        setEditando(false);
      } else {
        alert("Erro ao atualizar: " + (dadosResposta.erro || "Falha desconhecida."));
      }
    } catch (erro) {
      console.error("Erro na atualização:", erro);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <Layout>
      <div className="perfil-container">
        <h1>Minha Conta</h1>
        <p className="perfil-subtitulo">
          Gerencie suas informações pessoais e configurações da conta.
        </p>

        <section className="card-perfil">
          <div className="card-header">
            <div className="titulo-card">
              <User size={30} />
              <div>
                <h2>Dados Pessoais</h2>
                <p>Atualize suas informações cadastradas</p>
              </div>
            </div>

            {!editando && (
              <button className="btn-editar" onClick={editarDados}>
                <Pencil size={18} />
                Editar Dados
              </button>
            )}
          </div>

          <div className="dados-grid">
            <div className="campo">
              <label>Nome Completo</label>
              <input
                type="text"
                name="nome"
                value={usuario.nome}
                onChange={handleChange}
                readOnly={!editando}
                className={editando ? "input-editavel" : ""}
              />
            </div>
            <div className="campo">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
                readOnly={!editando}
                className={editando ? "input-editavel" : ""}
              />
            </div>
            <div className="campo">
              <label>Matrícula</label>
              <input
                type="text"
                name="ra"
                value={usuario.ra}
                onChange={handleChange}
                readOnly={!editando}
                className={editando ? "input-editavel" : ""}
              />
            </div>
          </div>

          {editando && (
            <div className="acoes-edicao">
              <button className="btn-cancelar" onClick={cancelarEdicao}>
                Cancelar
              </button>
              <button className="btn-salvar" onClick={salvarDados}>
                Salvar Alterações
              </button>
            </div>
          )}
        </section>

        <section className="card-perfil">
          <div className="titulo-card">
            <Shield size={30} />
            <div>
              <h2>Segurança da Conta</h2>
              <p>Altere sua senha quando necessário</p>
            </div>
          </div>

          <button className="btn-senha" onClick={() => setModalSenhaAberto(true)}>
            Alterar Senha
          </button>
        </section>

        <section className="card-excluir">
          <div>
            <h2>Excluir minha conta</h2>
            <p>Todos os seus dados serão removidos permanentemente.</p>
          </div>
          <button className="btn-excluir" onClick={handleExcluirConta}>
            <Trash2 size={18} />
            Excluir Conta
          </button>
        </section>
      </div>

      {modalSenhaAberto && (
        <div className="modal-overlay">
          <div className="modal-content">

            <div className="modal-header-container">
              <h2>Alterar Senha</h2>
              <button className="btn-fechar-modal" onClick={fecharModalSenha}>
                <X size={24} />
              </button>
            </div>

            <div className="campo input-senha-container">
              <label>Nova Senha</label>
              <div className="input-with-icon">
                <input
                  type={mostrarNovaSenha ? "text" : "password"}
                  name="novaSenha"
                  value={dadosSenha.novaSenha}
                  onChange={handleSenhaChange}
                  placeholder="Digite a nova senha"
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                >
                  {mostrarNovaSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="campo input-senha-container">
              <label>Confirmar Nova Senha</label>
              <div className="input-with-icon">
                <input
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  name="confirmarSenha"
                  value={dadosSenha.confirmarSenha}
                  onChange={handleSenhaChange}
                  placeholder="Repita a nova senha"
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                >
                  {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="acoes-edicao" style={{ marginTop: "30px" }}>
              <button className="btn-cancelar" onClick={fecharModalSenha}>
                Cancelar
              </button>
              <button className="btn-salvar" onClick={handleConfirmarSenha}>
                Confirmar
              </button>
            </div>

          </div>
        </div>
      )}

    </Layout>
  );
}