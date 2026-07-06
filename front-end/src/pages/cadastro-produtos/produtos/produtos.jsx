import { useState, useEffect } from "react";
import Layout from "../../../components/layout/layout.jsx";
import InformacoesProduto from "../informacoes-produtos/informacoes-produto.jsx";
import ProdutosSalvos from "../produtos-salvos/produtos-salvos.jsx";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  async function carregarProdutos() {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/produtos", {
        method: "GET",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.ok) {
        const listaDeProdutos = data.dados || data;

        setProdutos(Array.isArray(listaDeProdutos) ? listaDeProdutos : []);
      } else {
        console.error("Erro do servidor:", data.erro || data.mensagem);
        setProdutos([]);
      }
    } catch (error) {
      console.error("Erro na requisição de produtos:", error);
      setProdutos([]);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarProdutos();
  }, []);

  function handleEditarProduto(produto) {
    setProdutoEmEdicao(produto);

    document.getElementById("cadastrar-produto")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <Layout>
      <div className="page-header">
        <h1>{produtoEmEdicao ? "Editar produto" : "Cadastrar produto"}</h1>
        <p>
          {produtoEmEdicao
            ? "Altere as informações abaixo para atualizar o produto no catálogo."
            : "Preencha as informações abaixo para adicionar um novo produto ao catálogo."}
        </p>
      </div>

      <InformacoesProduto
        key={produtoEmEdicao?.id ?? "novo"}
        onProdutoSalvo={carregarProdutos}
        produtoEmEdicao={produtoEmEdicao}
        setProdutoEmEdicao={setProdutoEmEdicao}
      />

      <ProdutosSalvos
        produtos={produtos}
        onProdutoDeletado={carregarProdutos}
        onEdit={handleEditarProduto}
      />
    </Layout>
  );
}
