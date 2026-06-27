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
    const produtos = await Produto.findAll({ where: { ativo: true } });
    return produtos;
};

export const ocultarProdutoService = async (id) => {
    const produto = await Produto.findByPk(id);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.ativo = false;
    await produto.save();

    return produto;
};