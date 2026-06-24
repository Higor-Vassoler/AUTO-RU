import Produto from "../models/Produto.js";

export const criarProdutoService = async (nome, descricao, preco_unitario, quantidade_estoque) => {
    if (!nome || !descricao || !preco_unitario || !quantidade_estoque) {
        throw new Error("Nome, descrição, preço e quantidade são obrigatórios.");
    }

    const novoProduto = await Produto.create({
        nome: nome,
        descricao: descricao,
        preco_unitario: preco_unitario,
        quantidade_estoque: quantidade_estoque
    });

    return novoProduto;
};

export const listarProdutosService = async () => {
    const produtos = await Produto.findAll();

    return produtos;
};