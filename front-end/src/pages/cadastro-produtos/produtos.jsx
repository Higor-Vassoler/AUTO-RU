import Layout from "../../components/layout/layout.jsx";

import InformacoesProduto from "./informacoes-produto.jsx";
import ProdutosSalvos from "./produtos-salvos.jsx";

{
  /* Implementar logica de backend para injetar os valores de "produtos" do banco de dados na tabela do arquivo "produtos-salvos.jsx" */
}

export default function Produtos() {
  const produtos = []; {/* <- Talvez tenha q mudar isso aq */}

  return (
    <Layout>
      <InformacoesProduto />

      <ProdutosSalvos produtos={produtos} />
    </Layout>
  );
}
