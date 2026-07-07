import { Pedido, ItemPedido, Produto } from '../models/index.js';
import sequelize from '../config/database.js';

export const finalizarPedidoService = async ({ id_forma_pagamento, itens, ra }) => {
    const t = await sequelize.transaction();

    try {
        let preco_total_pedido = 0;
        const itensParaSalvar = [];

        for (const item of itens) {
            const idProduto = item.id_produto || item.id;
            const quantidadeItem = item.quantidade || item.quantity;

            const produto = await Produto.findByPk(idProduto, { transaction: t });

            if (!produto) {
                throw new Error(`Produto ID ${idProduto} nÃ£o foi encontrado.`);
            }

            if (produto.quantidade_estoque < quantidadeItem) {
                throw new Error(`Estoque insuficiente para o item: ${produto.nome}. Restam apenas ${produto.quantidade_estoque} unidades.`);
            }

            produto.quantidade_estoque -= quantidadeItem;
            await produto.save({ transaction: t });

            const precoUnitario = produto.preco_unitario || produto.preco;
            const subtotal = precoUnitario * quantidadeItem;
            preco_total_pedido += subtotal;

            itensParaSalvar.push({
                id_produto: idProduto,
                quantidade: quantidadeItem,
                preco_unitario: precoUnitario
            });
        }

        const novoPedido = await Pedido.create({
            ra,
            id_forma_pagamento,
            data: new Date(),
            preco_total: preco_total_pedido
        }, { transaction: t });

        const itensVinculados = itensParaSalvar.map(item => ({
            ...item,
            id_pedido: novoPedido.id_pedido || novoPedido.id
        }));

        await ItemPedido.bulkCreate(itensVinculados, { transaction: t });

        await t.commit();

        return {
            ticket_id: novoPedido.id_pedido || novoPedido.id,
            total: preco_total_pedido
        };

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

export const buscarPedidoPorIdService = async (id) => {
    const pedido = await Pedido.findByPk(id, {
        include: [
            {
                model: ItemPedido,
                include: [{ model: Produto }]
            }
        ]
    });
    return pedido;
};