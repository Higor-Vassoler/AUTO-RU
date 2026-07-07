import { listarItensPorPedidoService, criarItemPedidoService } from '../services/ItemPedidoService.js';

export const listarPorPedido = async (req, res) => {
    try {
        const { id_pedido } = req.params;
        const itens = await listarItensPorPedidoService(id_pedido);
        return res.status(200).json(itens);
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
};

export const criar = async (req, res) => {
    try {
        const novoItem = await criarItemPedidoService(req.body);
        return res.status(201).json(novoItem);
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
};