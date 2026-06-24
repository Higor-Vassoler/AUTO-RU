import { criarProdutoService, listarProdutosService } from "../services/ProdutoService.js";

export const criarProduto = async (req, res) => {
    try {
        const { nome, descricao, preco_unitario, quantidade_estoque } = req.body;

        const novoProduto = await criarProdutoService(nome, descricao, preco_unitario, quantidade_estoque);

        return res.status(201).json({
            mensagem: "Produto cadastrado com sucesso.",
            produto: novoProduto
        });
    } catch (erro) {
        console.error(`Erro ao criar produto: ${erro}`);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    };
};

export const listarProdutos = async (req, res) => {
    try {
        const produtos = await listarProdutosService();
        return res.status(200).json(produtos);
    } catch (erro) {
        console.erro(`Erro ao buscar produtos: ${erro}`);
        return res.status(500).json({ erro: "Erro interno ao buscar dados." });
    }
};