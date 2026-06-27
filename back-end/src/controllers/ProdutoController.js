import { criarProdutoService } from "../services/ProdutoService.js";

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