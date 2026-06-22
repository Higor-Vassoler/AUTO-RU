import { criarPedidoService, listarPedidosService } from "../services/PedidoService.js";

export const criarPedido = async (req, res) => {
    try {
        const id_usuario = req.id_usuario;
        const { forma_pagamento, preco_total } = req.body;

        const novoPedido = await criarPedidoService(id_usuario, forma_pagamento, preco_total);

        return res.status(201).json({
            mensagem: "Pedido realizado com sucesso.",
            pedido: novoPedido
        });
    } catch (erro) {
        console.error(`Erro ao criar pedido: ${erro}`);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};

export const listarPedidos = async (req, res) => {
    try {
        const id_usuario = req.id_usuario;

        const pedidos = await listarPedidosService(id_usuario);

        return res.status(200).json(pedidos);
    } catch (erro) {
        console.error(`Erro ao buscar pedidos: ${erro}`);
        return res.status(500).json({ erro: "Erro interno ao buscar os pedidos." });
    }
};