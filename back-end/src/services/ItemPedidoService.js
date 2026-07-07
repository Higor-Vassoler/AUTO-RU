import ItemPedido from '../models/ItemPedido.js';

export const obterItensPorPedidoService = async (id_pedido) => {
    try {
        const itens = await ItemPedido.findAll({
            where: {
                id_pedido: id_pedido
            }
        });

        return itens;
    } catch (erro) {
        throw new Error(`Falha ao buscar os itens no banco de dados: ${erro.message}`);
    }
};