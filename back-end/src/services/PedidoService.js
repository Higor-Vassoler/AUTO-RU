import Pedido from "../models/Pedido.js";

export const criarPedidoService = async (id_usuario, forma_pagamento, preco_total) => {
    if (!forma_pagamento || !preco_total) {
        throw new Error("Forma de pagamento e preço são obrigatórios.");
    }

    const novoPedido = await Pedido.create({
        id_usuario: id_usuario,
        forma_pagamento: forma_pagamento,
        preco_total: preco_total
    });

    return novoPedido;
};

export const listarPedidosService = async (id_usuario) => {
    const pedidos = await Pedido.findAll({
        where: { id_usuario: id_usuario }
    });

    return pedidos;
};