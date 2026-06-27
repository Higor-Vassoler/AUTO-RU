import { Produto } from "../models/index.js";

export const criarProdutoService = async (codigo, nome, preco, categoria, quantidade, descricao, imagem) => {
    if (!codigo || !nome || !preco || !categoria || !quantidade || !descricao) {
        throw new Error("Preencha todos os campos obrigatórios.");
    }

    const produtoExistente = await Produto.findOne({ where: { codigo } });
    if (produtoExistente) {
        throw new Error("Já existe um produto cadastrado com este ID.");
    }

    const novoProduto = await Produto.create({
        codigo,
        nome,
        preco,
        categoria,
        quantidade,
        descricao,
        imagem
    });

    return novoProduto;
};

export const listarProdutosService = async () => {
    const produtos = await Produto.findAll();
    return produtos;
};