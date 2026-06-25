import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/layout";
import "./cadastro.css";

import {
  UserPlus,
  ShoppingCart,
  Heart,
  Package,
  Ticket,
  Shield,
  Eye,
  EyeOff
} from "lucide-react";

export default function Cadastro() {

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    matricula: "",
    email: "",
    senha: "",
    confirmarSenha: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const cadastrarUsuario = async () => {

    if (
      !formData.nome ||
      !formData.matricula ||
      !formData.email ||
      !formData.senha ||
      !formData.confirmarSenha
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:5000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          confirmarSenha: formData.confirmarSenha,
          ra: formData.matricula
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Ocorreu um erro ao realizar o cadastro.");
        return;
      }

      alert(dados.mensagem || "Conta criada com sucesso!");

      setFormData({
        nome: "",
        matricula: "",
        email: "",
        senha: "",
        confirmarSenha: ""
      });

    } catch (erro) {
      console.error("Erro na comunicação com o servidor:", erro);
      alert("Não foi possível conectar ao servidor. Certifique-se de que o back-end está rodando.");
    }
  };

  return (
    <Layout showSidebar={false}>

      <div className="cadastro-container">

        <div className="cadastro-card">

          {/* COLUNA ESQUERDA */}

          <div className="cadastro-info">

            <div className="icone-principal">
              <UserPlus size={34} />
            </div>

            <h1>Crie sua conta</h1>

            <p>
              Cadastre-se para aproveitar todos os benefícios
              do RU da sua faculdade.
            </p>

            <div className="beneficio">

              <div className="beneficio-icone">
                <ShoppingCart size={24} />
              </div>

              <div>
                <h3>Faça pedidos</h3>
                <p>
                  Peça seus pratos favoritos
                  de forma rápida e prática.
                </p>
              </div>

            </div>

            <div className="beneficio">

              <div className="beneficio-icone">
                <Ticket size={24} />
              </div>

              <div>
                <h3>Ofertas exclusivas</h3>
                <p>
                  Receba promoções e novidades
                  especialmente para você.
                </p>
              </div>

            </div>

          </div>

          {/* COLUNA DIREITA */}

          <div className="cadastro-formulario">

            <h2>Cadastrar conta</h2>

            <p className="subtitulo">
              Preencha os dados abaixo para criar sua conta.
            </p>

            <div className="duas-colunas">

              <div className="campo">
                <label>Nome completo</label>

                <input
                  type="text"
                  name="nome"
                  placeholder="Digite seu nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>

              <div className="campo">
                <label>Matrícula</label>

                <input
                  type="text"
                  name="matricula"
                  placeholder="Digite sua matrícula"
                  value={formData.matricula}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="campo">
              <label>E-mail</label>

              <input
                type="email"
                name="email"
                placeholder="seu.nome@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="campo">

              <label>Senha</label>

              <div className="senha-wrapper">

                <input
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  placeholder="Digite sua senha"
                  value={formData.senha}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="btn-olho"
                  onClick={() =>
                    setMostrarSenha(!mostrarSenha)
                  }
                >
                  {mostrarSenha ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            <div className="campo">

              <label>Confirmar senha</label>

              <div className="senha-wrapper">

                <input
                  type={mostrarConfirmacao ? "text" : "password"}
                  name="confirmarSenha"
                  placeholder="Confirme sua senha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="btn-olho"
                  onClick={() =>
                    setMostrarConfirmacao(!mostrarConfirmacao)
                  }
                >
                  {mostrarConfirmacao ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            <div className="seguranca-box">

              <Shield size={24} />

              <div>
                <strong>Segurança</strong>

                <p>
                  Sua senha deve ter pelo menos
                  8 caracteres, incluindo letras, números e símbolos.
                </p>
              </div>

            </div>

            <button
              className="btn-cadastrar"
              onClick={cadastrarUsuario}
            >
              Criar conta
            </button>

            <p className="login-link">
              Já tem uma conta? <Link to="/login">Entrar</Link>
            </p>

          </div>

        </div>

      </div>

    </Layout>
  );
}