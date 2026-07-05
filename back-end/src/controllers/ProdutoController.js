import { criarProdutoService, listarProdutosService, ocultarProdutoService, atualizarProdutoService } from "../services/ProdutoService.js";
import { ResponseFactory } from "../utils/ResponseFactory.js"; // <-- Importamos a Factory aqui!

export const criarProduto = async (req, res) => {
    try {
        const { codigo, nome, preco, categoria, quantidade, descricao } = req.body;
        const imagem = req.file ? req.file.filename : null;

        const novoProduto = await criarProdutoService(codigo, nome, preco, categoria, quantidade, descricao, imagem);

        return ResponseFactory.sucesso(res, "Produto cadastrado com sucesso!", { produto: novoProduto }, 201);
    } catch (erro) {
        return ResponseFactory.erro(res, erro.message);
    }
};

export const listarProdutos = async (req, res) => {
    try {
        const produtos = await listarProdutosService();

        return ResponseFactory.sucesso(res, "Lista carregada", produtos);
    } catch (erro) {
        return ResponseFactory.erro(res, "Erro ao buscar produtos: " + erro.message, 500);
    }
};

export const ocultarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        await ocultarProdutoService(id);

        return ResponseFactory.sucesso(res, "Produto ocultado com sucesso!");
    } catch (erro) {
        return ResponseFactory.erro(res, erro.message);
    }
};

export const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, nome, preco, categoria, quantidade, descricao } = req.body;
        const imagem = req.file ? req.file.filename : null;

        const produtoAtualizado = await atualizarProdutoService(id, codigo, nome, preco, categoria, quantidade, descricao, imagem);

        return ResponseFactory.sucesso(res, "Produto atualizado com sucesso!", { produto: produtoAtualizado });
    } catch (erro) {
        return ResponseFactory.erro(res, erro.message);
    }
};