import { criarProdutoService, listarProdutosService, ocultarProdutoService, atualizarProdutoService } from "../services/ProdutoService.js";

export const criarProduto = async (req, res) => {
    try {
        const { codigo, nome, preco, categoria, quantidade, descricao } = req.body;
        const imagem = req.file ? req.file.filename : null;

        const novoProduto = await criarProdutoService(
            codigo,
            nome,
            preco,
            categoria,
            quantidade,
            descricao,
            imagem
        );

        return res.status(201).json({
            mensagem: "Produto cadastrado com sucesso!",
            produto: novoProduto
        });
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
};

export const listarProdutos = async (req, res) => {
    try {
        const produtos = await listarProdutosService();
        return res.status(200).json(produtos);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao buscar produtos: " + erro.message });
    }
};

export const ocultarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        await ocultarProdutoService(id);
        return res.status(200).json({ mensagem: "Produto ocultado com sucesso!" });
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
};

export const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, nome, preco, categoria, quantidade, descricao } = req.body;
        const imagem = req.file ? req.file.filename : null;

        const produtoAtualizado = await atualizarProdutoService(
            id,
            codigo,
            nome,
            preco,
            categoria,
            quantidade,
            descricao,
            imagem
        );

        return res.status(200).json({
            mensagem: "Produto atualizado com sucesso!",
            produto: produtoAtualizado
        });
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
};