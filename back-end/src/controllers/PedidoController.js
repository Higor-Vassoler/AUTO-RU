import { finalizarPedidoService, buscarPedidoPorIdService } from '../services/PedidoService.js';

export const criarPedido = async (req, res) => {
    try {
        const { id_forma_pagamento, itens, ra } = req.body;

        const resultado = await finalizarPedidoService({
            id_forma_pagamento,
            itens,
            ra
        });

        return res.status(201).json(resultado);
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
};

export const obterPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await buscarPedidoPorIdService(id);
        if (!pedido) {
            return res.status(404).json({ mensagem: "Pedido não localizado." });
        }
        return res.status(200).json(pedido);
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.message });
    }
};