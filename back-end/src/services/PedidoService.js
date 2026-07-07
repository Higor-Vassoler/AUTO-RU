import { Pedido, ItemPedido, Produto, Usuario, FormadePagamento } from '../models/index.js';
import sequelize from '../config/database.js';

export const finalizarPedidoService = async ({ id_forma_pagamento, itens, ra }) => {
    const t = await sequelize.transaction();

    try {
        const usuario = await Usuario.findOne({ where: { ra }, transaction: t });

        if (!usuario) {
            throw new Error(`Nenhum usuário encontrado com o RA: ${ra}`);
        }

        let preco_total_pedido = 0;
        const itensParaSalvar = [];

        for (const item of itens) {
            const idProduto = item.id_produto || item.id;
            const quantidadeItem = item.quantidade || item.quantity;

            const produto = await Produto.findByPk(idProduto, { transaction: t });

            if (!produto) {
                throw new Error(`Produto ID ${idProduto} não foi encontrado.`);
            }

            if (produto.quantidade < quantidadeItem) {
                throw new Error(`Estoque insuficiente para o item: ${produto.nome}. Restam apenas ${produto.quantidade} unidades.`);
            }

            produto.quantidade -= quantidadeItem;
            await produto.save({ transaction: t });

            const precoUnitario = produto.preco;
            const subtotal = precoUnitario * quantidadeItem;
            preco_total_pedido += subtotal;

            itensParaSalvar.push({
                id_produto: idProduto,
                quantidade: quantidadeItem,
                preco_unitario: precoUnitario
            });
        }

        const novoPedido = await Pedido.create({
            id_usuario: usuario.id,
            id_forma_pagamento,
            data: new Date(),
            preco_total: preco_total_pedido
        }, { transaction: t });

        const itensVinculados = itensParaSalvar.map(item => ({
            ...item,
            id_pedido: novoPedido.id
        }));

        await ItemPedido.bulkCreate(itensVinculados, { transaction: t });

        await t.commit();

        return {
            ticket_id: novoPedido.id,
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
                as: 'itens',
                include: [{
                    model: Produto,
                    as: 'produto'
                }]
            }
        ]
    });
    return pedido;
};

export const listarPedidosPorUsuarioService = async (id_usuario) => {
    const pedidos = await Pedido.findAll({
        where: { id_usuario },
        include: [
            {
                model: ItemPedido,
                as: 'itens',
                include: [{
                    model: Produto,
                    as: 'produto'
                }]
            },
            {
                model: FormadePagamento,
                as: 'formaPagamento'
            }
        ],
        order: [['data', 'DESC']]
    });

    return pedidos;
};