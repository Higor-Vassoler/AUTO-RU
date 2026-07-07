import {
  adaptarProduto,
  adaptarListaProdutos,
  filtrarProdutos,
  ordenarProdutos,
  filtrarEOrdenarProdutos,
  paginarProdutos,
} from "./catalogo-produtos";

describe("adaptarProduto", () => {
  test("converte preco em string para número (float)", () => {
    const produto = { id: 1, preco: "15.50" };
    const resultado = adaptarProduto(produto);
    expect(resultado.preco_unitario).toBe(15.5);
  });

  test("usa 0.0 como preco_unitario quando preco não existe", () => {
    const produto = { id: 2 };
    const resultado = adaptarProduto(produto);
    expect(resultado.preco_unitario).toBe(0.0);
  });

  test("mapeia id para id_produto", () => {
    const produto = { id: 7, preco: "10" };
    const resultado = adaptarProduto(produto);
    expect(resultado.id_produto).toBe(7);
  });

  test("usa 0 como quantidade_estoque quando quantidade não vem definida", () => {
    const produto = { id: 3, preco: "10" };
    const resultado = adaptarProduto(produto);
    expect(resultado.quantidade_estoque).toBe(0);
  });

  test("mantém quantidade_estoque igual a 0 quando já vem como 0 (não confundir com undefined)", () => {
    const produto = { id: 4, preco: "10", quantidade: 0 };
    const resultado = adaptarProduto(produto);
    expect(resultado.quantidade_estoque).toBe(0);
  });

  test("monta a URL da imagem quando produto tem imagem", () => {
    const produto = { id: 5, preco: "10", imagem: "arroz.jpg" };
    const resultado = adaptarProduto(produto);
    expect(resultado.imagem).toBe("http://localhost:5000/uploads/arroz.jpg");
  });

  test("retorna imagem null quando produto não tem imagem", () => {
    const produto = { id: 6, preco: "10" };
    const resultado = adaptarProduto(produto);
    expect(resultado.imagem).toBeNull();
  });
});

describe("adaptarListaProdutos", () => {
  test("adapta uma lista inteira de produtos", () => {
    const produtos = [
      { id: 1, preco: "10" },
      { id: 2, preco: "20" },
    ];
    const resultado = adaptarListaProdutos(produtos);
    expect(resultado).toHaveLength(2);
    expect(resultado[0].id_produto).toBe(1);
    expect(resultado[1].id_produto).toBe(2);
  });

  test("retorna lista vazia quando input é vazio", () => {
    expect(adaptarListaProdutos([])).toEqual([]);
  });
});

describe("filtrarProdutos", () => {
  const produtos = [
    { nome: "Arroz Branco", categoria: "Grãos" },
    { nome: "Feijão Carioca", categoria: "Grãos" },
    { nome: "Leite Integral", categoria: "Laticínios" },
  ];

  test("filtra por texto de busca (case insensitive)", () => {
    const resultado = filtrarProdutos(produtos, "ARROZ", "Todas");
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nome).toBe("Arroz Branco");
  });

  test("filtra por categoria", () => {
    const resultado = filtrarProdutos(produtos, "", "Laticínios");
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nome).toBe("Leite Integral");
  });

  test("combina busca e categoria", () => {
    const resultado = filtrarProdutos(produtos, "feijão", "Grãos");
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nome).toBe("Feijão Carioca");
  });

  test('retorna tudo quando busca vazia e categoria "Todas"', () => {
    const resultado = filtrarProdutos(produtos, "", "Todas");
    expect(resultado).toHaveLength(3);
  });

  test("retorna lista vazia quando nada corresponde à busca", () => {
    const resultado = filtrarProdutos(produtos, "inexistente", "Todas");
    expect(resultado).toHaveLength(0);
  });

  test("não modifica o array original (imutabilidade)", () => {
    const original = [...produtos];
    filtrarProdutos(produtos, "arroz", "Todas");
    expect(produtos).toEqual(original);
  });
});

describe("ordenarProdutos", () => {
  const produtos = [
    { nome: "Banana", preco_unitario: 5, id_produto: 1 },
    { nome: "Abacaxi", preco_unitario: 8, id_produto: 2 },
    { nome: "Cereja", preco_unitario: 2, id_produto: 3 },
  ];

  test('ordena alfabeticamente A-Z ("az")', () => {
    const resultado = ordenarProdutos(produtos, "az");
    expect(resultado.map((p) => p.nome)).toEqual([
      "Abacaxi",
      "Banana",
      "Cereja",
    ]);
  });

  test('ordena alfabeticamente Z-A ("za")', () => {
    const resultado = ordenarProdutos(produtos, "za");
    expect(resultado.map((p) => p.nome)).toEqual([
      "Cereja",
      "Banana",
      "Abacaxi",
    ]);
  });

  test("ordena por preço crescente", () => {
    const resultado = ordenarProdutos(produtos, "preco-menor");
    expect(resultado.map((p) => p.preco_unitario)).toEqual([2, 5, 8]);
  });

  test("ordena por preço decrescente", () => {
    const resultado = ordenarProdutos(produtos, "preco-maior");
    expect(resultado.map((p) => p.preco_unitario)).toEqual([8, 5, 2]);
  });

  test("ordena por relevância (id decrescente) quando critério é desconhecido/default", () => {
    const resultado = ordenarProdutos(produtos, "relevancia");
    expect(resultado.map((p) => p.id_produto)).toEqual([3, 2, 1]);
  });

  test("não modifica o array original (imutabilidade)", () => {
    const original = [...produtos];
    ordenarProdutos(produtos, "az");
    expect(produtos).toEqual(original);
  });
});

describe("filtrarEOrdenarProdutos", () => {
  const produtos = [
    { nome: "Arroz", categoria: "Grãos", preco_unitario: 10, id_produto: 1 },
    { nome: "Feijão", categoria: "Grãos", preco_unitario: 5, id_produto: 2 },
    {
      nome: "Leite",
      categoria: "Laticínios",
      preco_unitario: 4,
      id_produto: 3,
    },
  ];

  test("filtra por categoria e depois ordena por preço", () => {
    const resultado = filtrarEOrdenarProdutos(
      produtos,
      "",
      "Grãos",
      "preco-menor",
    );
    expect(resultado.map((p) => p.nome)).toEqual(["Feijão", "Arroz"]);
  });
});

describe("paginarProdutos", () => {
  const produtos = Array.from({ length: 10 }, (_, i) => ({
    id_produto: i + 1,
  }));

  test("calcula total de páginas corretamente", () => {
    const { totalPaginas } = paginarProdutos(produtos, 1, 8);
    expect(totalPaginas).toBe(2);
  });

  test("retorna os produtos corretos da primeira página", () => {
    const { produtosPaginaAtual } = paginarProdutos(produtos, 1, 8);
    expect(produtosPaginaAtual).toHaveLength(8);
    expect(produtosPaginaAtual[0].id_produto).toBe(1);
  });

  test("retorna os produtos corretos da segunda página", () => {
    const { produtosPaginaAtual } = paginarProdutos(produtos, 2, 8);
    expect(produtosPaginaAtual).toHaveLength(2);
    expect(produtosPaginaAtual[0].id_produto).toBe(9);
  });

  test("retorna ao menos 1 página mesmo com lista vazia", () => {
    const { totalPaginas, produtosPaginaAtual } = paginarProdutos([], 1, 8);
    expect(totalPaginas).toBe(1);
    expect(produtosPaginaAtual).toHaveLength(0);
  });
});
