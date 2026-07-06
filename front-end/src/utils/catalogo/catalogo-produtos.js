export function adaptarProduto(produto) {
  return {
    ...produto,
    id_produto: produto.id,
    preco_unitario: produto.preco ? parseFloat(produto.preco) : 0.0,
    quantidade_estoque:
      produto.quantidade !== undefined ? produto.quantidade : 0,
    imagem: produto.imagem
      ? `http://localhost:5000/uploads/${produto.imagem}`
      : null,
  };
}

export function adaptarListaProdutos(produtos) {
  return produtos.map(adaptarProduto);
}

export function filtrarProdutos(produtos, valorBusca, categoriaSelecionada) {
  let listaFiltrada = [...produtos];

  if (valorBusca && valorBusca.trim()) {
    listaFiltrada = listaFiltrada.filter((produto) =>
      produto.nome.toLowerCase().includes(valorBusca.toLowerCase()),
    );
  }

  if (categoriaSelecionada && categoriaSelecionada !== "Todas") {
    listaFiltrada = listaFiltrada.filter(
      (produto) => produto.categoria === categoriaSelecionada,
    );
  }

  return listaFiltrada;
}

export function ordenarProdutos(produtos, ordenacao) {
  const lista = [...produtos];

  switch (ordenacao) {
    case "az":
      return lista.sort((a, b) => a.nome.localeCompare(b.nome));
    case "za":
      return lista.sort((a, b) => b.nome.localeCompare(a.nome));
    case "preco-menor":
      return lista.sort((a, b) => a.preco_unitario - b.preco_unitario);
    case "preco-maior":
      return lista.sort((a, b) => b.preco_unitario - a.preco_unitario);
    default:
      return lista.sort((a, b) => b.id_produto - a.id_produto);
  }
}

export function filtrarEOrdenarProdutos(
  produtos,
  valorBusca,
  categoriaSelecionada,
  ordenacao,
) {
  const filtrados = filtrarProdutos(produtos, valorBusca, categoriaSelecionada);
  return ordenarProdutos(filtrados, ordenacao);
}

export function paginarProdutos(
  produtosFiltrados,
  paginaAtual,
  produtosPorPagina,
) {
  const totalPaginas = Math.max(
    1,
    Math.ceil(produtosFiltrados.length / produtosPorPagina),
  );

  const indiceInicial = (paginaAtual - 1) * produtosPorPagina;
  const indiceFinal = indiceInicial + produtosPorPagina;
  const produtosPaginaAtual = produtosFiltrados.slice(
    indiceInicial,
    indiceFinal,
  );

  return { totalPaginas, produtosPaginaAtual };
}
