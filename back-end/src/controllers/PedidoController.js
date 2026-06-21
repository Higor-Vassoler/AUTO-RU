import Pedido from "../models/Pedido.js";

export const criarPedido = async (req, res) => {
    try {
        const id_usuario = req.id_usuario;
        const { forma_pagamento, preco_total } = req.body;

        if (!forma_pagamento || !preco_total) {
            return res.status(400).json({ erro: "Forma de pagamento e preço são obrigatórios." });
        }

        const novoPedido = await Pedido.create({
            id_usuario: id_usuario,
            forma_pagamento: forma_pagamento,
            preco_total: preco_total
        });

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

        const pedidos = await Pedido.findAll({
            where: { id_usuario: id_usuario }
        });

        return res.status(200).json(pedidos);
    } catch (erro) {
        console.error(`Erro ao buscar pedidos: ${erro}`);
        return res.status(500).json({ erro: "Erro interno ao buscar os pedidos." });
    }
};