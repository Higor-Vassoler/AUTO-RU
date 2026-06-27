import { useState, useEffect } from "react";
import Layout from "../../../components/layout/layout.jsx";
import InformacoesProduto from "../informacoes-produtos/informacoes-produto.jsx";
import ProdutosSalvos from "../produtos-salvos/produtos-salvos.jsx";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  async function carregarProdutos() {
    try {
      const response = await fetch("http://localhost:5000/api/produtos");
      const data = await response.json();

      if (response.ok) {
        setProdutos(data);
      } else {
        console.error("Erro ao buscar produtos:", data.erro);
      }
    } catch (error) {
      console.error("Erro na requisição de produtos:", error);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <Layout>
      <div className="page-header">
        <h1>Cadastrar produto</h1>
        <p>
          Preencha as informações abaixo para adicionar um novo produto ao
          catálogo.
        </p>
      </div>

      <InformacoesProduto onProdutoSalvo={carregarProdutos} />

      <ProdutosSalvos produtos={produtos} />
    </Layout>
  );
}
