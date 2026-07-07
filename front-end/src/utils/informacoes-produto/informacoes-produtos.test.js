// import { describe, test, expect } from "vitest";
import {
  determinarRequisicaoProduto,
  obterMensagemSucesso,
  obterTextoAcao,
  montarFormDataProduto,
} from "./informacoes-produto";

describe("determinarRequisicaoProduto", () => {
  test("retorna método POST e URL base quando não há produto em edição (cadastro novo)", () => {
    const resultado = determinarRequisicaoProduto(null);
    expect(resultado).toEqual({
      url: "http://localhost:5000/api/produtos",
      metodo: "POST",
    });
  });

  test("retorna método PUT e URL com id quando há produto em edição", () => {
    const produtoEmEdicao = { id: 42 };
    const resultado = determinarRequisicaoProduto(produtoEmEdicao);
    expect(resultado).toEqual({
      url: "http://localhost:5000/api/produtos/42",
      metodo: "PUT",
    });
  });

  test("aceita uma baseUrl customizada", () => {
    const resultado = determinarRequisicaoProduto(
      null,
      "http://api.teste.com/produtos",
    );
    expect(resultado.url).toBe("http://api.teste.com/produtos");
  });

  test("monta a URL de edição corretamente com baseUrl customizada", () => {
    const produtoEmEdicao = { id: 7 };
    const resultado = determinarRequisicaoProduto(
      produtoEmEdicao,
      "http://api.teste.com/produtos",
    );
    expect(resultado.url).toBe("http://api.teste.com/produtos/7");
  });
});

describe("obterMensagemSucesso", () => {
  test("retorna mensagem de cadastro quando não há produto em edição", () => {
    expect(obterMensagemSucesso(null)).toBe("Produto cadastrado com sucesso!");
  });

  test("retorna mensagem de atualização quando há produto em edição", () => {
    expect(obterMensagemSucesso({ id: 1 })).toBe(
      "Produto atualizado com sucesso!",
    );
  });
});

describe("obterTextoAcao", () => {
  test('retorna "cadastrado" quando não há produto em edição', () => {
    expect(obterTextoAcao(null)).toBe("cadastrado");
  });

  test('retorna "atualizado" quando há produto em edição', () => {
    expect(obterTextoAcao({ id: 1 })).toBe("atualizado");
  });

  test("undefined também é tratado como cadastro novo", () => {
    expect(obterTextoAcao(undefined)).toBe("cadastrado");
  });
});

describe("montarFormDataProduto", () => {
  const dadosBase = {
    nome: "Suco de Laranja",
    codigo: "SUC001",
    preco: "15.50",
    categoria: "Bebidas",
    quantidade: "50",
    descricao: "Suco natural sem açúcar.",
    imagemArquivo: null,
  };

  test("inclui todos os campos de texto no FormData", () => {
    const formData = montarFormDataProduto(dadosBase);
    expect(formData.get("nome")).toBe("Suco de Laranja");
    expect(formData.get("codigo")).toBe("SUC001");
    expect(formData.get("preco")).toBe("15.50");
    expect(formData.get("categoria")).toBe("Bebidas");
    expect(formData.get("quantidade")).toBe("50");
    expect(formData.get("descricao")).toBe("Suco natural sem açúcar.");
  });

  test("não inclui campo imagem quando imagemArquivo é null", () => {
    const formData = montarFormDataProduto(dadosBase);
    expect(formData.get("imagem")).toBeNull();
  });

  test("inclui campo imagem quando imagemArquivo é fornecido", () => {
    const arquivoFake = new File(["conteudo"], "foto.jpg", {
      type: "image/jpeg",
    });
    const formData = montarFormDataProduto({
      ...dadosBase,
      imagemArquivo: arquivoFake,
    });
    expect(formData.get("imagem")).toBe(arquivoFake);
  });
});
