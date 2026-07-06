import { criarProdutoService, listarProdutosService, ocultarProdutoService, atualizarProdutoService } from "../services/ProdutoService.js";
import { ResponseFactory } from "../utils/ResponseFactory.js";

export const criarProduto = async (req, res) => {
    try {
        const { codigo, nome, preco, categoria, quantidade, descricao } = req.body;
        const imagem = req.file ? req.file.filename : null;

        const novoProduto = await criarProdutoService(codigo, nome, preco, categoria, quantidade, descricao, imagem);

        return ResponseFactory.criarSucesso("Produto cadastrado com sucesso!", { produto: novoProduto }, 201).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message).enviar(res);
    }
};

export const listarProdutos = async (req, res) => {
    try {
        const produtos = await listarProdutosService();

        return ResponseFactory.criarSucesso("Lista carregada", produtos).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro("Erro ao buscar produtos: " + erro.message, 500).enviar(res);
    }
};

export const ocultarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        await ocultarProdutoService(id);

        return ResponseFactory.criarSucesso("Produto ocultado com sucesso!").enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message).enviar(res);
    }
};

export const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, nome, preco, categoria, quantidade, descricao } = req.body;
        const imagem = req.file ? req.file.filename : null;

        const produtoAtualizado = await atualizarProdutoService(id, codigo, nome, preco, categoria, quantidade, descricao, imagem);

        return ResponseFactory.criarSucesso("Produto atualizado com sucesso!", { produto: produtoAtualizado }).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message).enviar(res);
    }
};