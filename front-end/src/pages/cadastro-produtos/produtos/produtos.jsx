import Layout from "../../../components/layout/layout.jsx";
import InformacoesProduto from "../informacoes-produtos/informacoes-produto.jsx";
import ProdutosSalvos from "../produtos-salvos/produtos-salvos.jsx";

{
  /* Implementar logica de backend para injetar os valores de "produtos" do banco de dados na tabela do arquivo "produtos-salvos.jsx" */
}

export default function Produtos() {
  const produtos = [];
  {
    /* <- Talvez tenha q mudar isso aq, parte do backend */
  }

  return (
    <Layout>
      <div className="page-header">
        <h1>Cadastrar produto</h1>
        <p>
          Preencha as informações abaixo para adicionar um novo produto ao
          catálogo.
        </p>
      </div>

      <InformacoesProduto />

      <ProdutosSalvos produtos={produtos} />
    </Layout>
  );
}
