const BASE_URL_PADRAO = "http://localhost:5000/api/produtos";

export function determinarRequisicaoProduto(
  produtoEmEdicao,
  baseUrl = BASE_URL_PADRAO,
) {
  if (produtoEmEdicao) {
    return {
      url: `${baseUrl}/${produtoEmEdicao.id}`,
      metodo: "PUT",
    };
  }

  return {
    url: baseUrl,
    metodo: "POST",
  };
}

export function obterMensagemSucesso(produtoEmEdicao) {
  return produtoEmEdicao
    ? "Produto atualizado com sucesso!"
    : "Produto cadastrado com sucesso!";
}

export function obterTextoAcao(produtoEmEdicao) {
  return produtoEmEdicao ? "atualizado" : "cadastrado";
}

export function montarFormDataProduto({
  nome,
  codigo,
  preco,
  categoria,
  quantidade,
  descricao,
  imagemArquivo,
}) {
  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("codigo", codigo);
  formData.append("preco", preco);
  formData.append("categoria", categoria);
  formData.append("quantidade", quantidade);
  formData.append("descricao", descricao);

  if (imagemArquivo) {
    formData.append("imagem", imagemArquivo);
  }

  return formData;
}
