import Produto from "../models/Produto.js";

export const criarProduto = async (req, res) => {
    try {
        const { nome, descricao, preco_unitario, quantidade_estoque } = req.body;

        if (!nome || !descricao || !preco_unitario || !quantidade_estoque) {
            return res.status(400).json({ erro: "Nome, descrição, preço e quantidade são obrigatórios." });
        }

        const novoProduto = await Produto.create({
            nome: nome,
            descricao: descricao,
            preco_unitario: preco_unitario,
            quantidade_estoque: quantidade_estoque
        });

        return res.status(201).json({
            mensagem: "Produto cadastrado com sucesso.",
            produto: novoProduto
        });
    } catch (erro) {
        console.error(`Erro ao criar produto: ${erro}`);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    };
}

export const listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        return res.status(200).json(produtos);
    } catch (erro) {
        console.erro(`Erro ao buscar produtos: ${erro}`);
        return res.status(500).json({ erro: "Erro interno ao buscar dados." });
    }
};