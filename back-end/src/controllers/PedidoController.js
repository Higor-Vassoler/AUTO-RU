import { finalizarPedidoService, buscarPedidoPorIdService, listarPedidosPorUsuarioService } from '../services/PedidoService.js';
import { ResponseFactory } from '../utils/ResponseFactory.js';

export const criarPedido = async (req, res) => {
    try {
        const { id_forma_pagamento, itens, ra } = req.body;

        const resultado = await finalizarPedidoService({
            id_forma_pagamento,
            itens,
            ra
        });

        return ResponseFactory.criarSucesso("Pedido finalizado com sucesso.", resultado, 201).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message, 400).enviar(res);
    }
};

export const obterPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await buscarPedidoPorIdService(id);

        if (!pedido) {
            return ResponseFactory.criarErro("Pedido não localizado.", 404).enviar(res);
        }

        return ResponseFactory.criarSucesso("Pedido encontrado.", pedido).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message, 500).enviar(res);
    }
};

export const listarMeusPedidos = async (req, res) => {
    try {
        const id_usuario = req.id_usuario;

        if (!id_usuario) {
            return ResponseFactory.criarErro("Usuário não autenticado.", 401).enviar(res);
        }

        const pedidos = await listarPedidosPorUsuarioService(id_usuario);

        return ResponseFactory.criarSucesso("Pedidos carregados com sucesso.", pedidos).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message, 500).enviar(res);
    }
};