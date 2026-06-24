import { useState } from "react";
import Layout from "../../components/layout/layout";
import "./style.css";

import {
  User,
  Shield,
  Trash2,
  Pencil
} from "lucide-react";

export default function Perfil() {

  const [editando, setEditando] = useState(false);

  const [usuario, setUsuario] = useState({
    nome: "Eduardo Cordeiro",
    email: "eduardo@gmail.com",
    telefone: "(44) 99999-9999"
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setUsuario({
      ...usuario,
      [name]: value
    });
  };

  const editarDados = () => {
    setEditando(true);
  };

  const cancelarEdicao = () => {
    setEditando(false);
  };

  const salvarDados = () => {
    console.log("Dados atualizados:", usuario);

    alert("Dados atualizados com sucesso!");

    setEditando(false);
  };


  return (
    <Layout>

      <div className="perfil-container">

        <h1>Minha Conta</h1>

        <p className="perfil-subtitulo">
          Gerencie suas informações pessoais e configurações da conta.
        </p>

        {/* DADOS PESSOAIS */}

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
              <button
                className="btn-editar"
                onClick={editarDados}
              >
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
              />
            </div>

            <div className="campo">
              <label>Telefone</label>

              <input
                type="text"
                name="telefone"
                value={usuario.telefone}
                onChange={handleChange}
                readOnly={!editando}
              />
            </div>

          </div>

          {editando && (

            <div className="acoes-edicao">

              <button
                className="btn-cancelar"
                onClick={cancelarEdicao}
              >
                Cancelar
              </button>

              <button
                className="btn-salvar"
                onClick={salvarDados}
              >
                Salvar Alterações
              </button>

            </div>

          )}

        </section>

        {/* SEGURANÇA */}

        <section className="card-perfil">

          <div className="titulo-card">

            <Shield size={30} />

            <div>
              <h2>Segurança da Conta</h2>
              <p>Altere sua senha quando necessário</p>
            </div>

          </div>

          <button className="btn-senha">
            Alterar Senha
          </button>

        </section>

        {/* EXCLUIR CONTA */}

        <section className="card-excluir">

          <div>

            <h2>Excluir minha conta</h2>

            <p>
              Todos os seus dados serão removidos permanentemente.
            </p>

          </div>

          <button className="btn-excluir">

            <Trash2 size={18} />

            Excluir Conta

          </button>

        </section>

      </div>

    </Layout>
  );
}