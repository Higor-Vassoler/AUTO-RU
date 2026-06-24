import { useState } from "react";
import Layout from "../../components/layout/layout";
import "./style.css";

import {
  User,
  ShoppingCart,
  Heart,
  Ticket,
  Mail,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

export default function Login() {

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [dados, setDados] = useState({
    email: "",
    senha: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDados({
      ...dados,
      [name]: value
    });
  };

  const fazerLogin = async () => {
    try {
      const { email, senha } = dados;

      const resposta = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      const dadosResposta = await resposta.json();

      if (!resposta.ok) {
        alert(dadosResposta.erro || "Falha no login");
        return;
      }

      localStorage.setItem("token", dadosResposta.token);
      alert("Bem-vindo!");

    } catch (err) {
      alert("Servidor fora do ar.");
    }
  };

  return (
    <Layout>

      <div className="login-container">

        <div className="login-card">

          {/* ESQUERDA */}

          <div className="login-info">

            <div className="icone-principal">
              <User size={34} />
            </div>

            <h1>Bem-vindo de volta!</h1>

            <p>
              Entre na sua conta para continuar
              aproveitando o melhor do RU.
            </p>

            <div className="beneficio">

              <div className="beneficio-icone">
                <ShoppingCart size={24} />
              </div>

              <div>
                <h3>Pedidos rápidos</h3>
                <p>Peça seus pratos favoritos em poucos cliques.</p>
              </div>

            </div>

            <div className="beneficio">

              <div className="beneficio-icone">
                <Heart size={24} />
              </div>

              <div>
                <h3>Seus favoritos</h3>
                <p>Salve e acesse seus pratos preferidos.</p>
              </div>

            </div>

            <div className="beneficio">

              <div className="beneficio-icone">
                <Ticket size={24} />
              </div>

              <div>
                <h3>Ofertas exclusivas</h3>
                <p>Receba promoções e novidades.</p>
              </div>

            </div>

          </div>

          {/* DIREITA */}

          <div className="login-formulario">

            <h2>Entrar</h2>

            <p className="subtitulo">
              Digite seu e-mail e senha para acessar sua conta.
            </p>

            <div className="campo">

              <label>E-mail</label>

              <div className="input-icon">

                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  placeholder="nome@email.com"
                  value={dados.email}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="campo">

              <label>Senha</label>

              <div className="input-icon">

                <Lock size={18} />

                <input
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  placeholder="Digite sua senha"
                  value={dados.senha}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="btn-olho"
                  onClick={() =>
                    setMostrarSenha(!mostrarSenha)
                  }
                >
                  {
                    mostrarSenha
                      ? <EyeOff size={18} />
                      : <Eye size={18} />
                  }
                </button>

              </div>

            </div>

            <div className="opcoes-login">

              <label className="lembrar">

                <input type="checkbox" />

                Lembrar de mim

              </label>

            </div>

            <button
              className="btn-login"
              onClick={fazerLogin}
            >
              Entrar
            </button>

            <p className="cadastro-link">
              Não tem uma conta?
              <a href="/cadastro"> Cadastre-se</a>
            </p>

          </div>

        </div>

      </div>

    </Layout>
  );
}