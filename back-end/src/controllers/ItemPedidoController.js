import { obterItensPorPedidoService } from '../services/ItemPedidoService.js';
import { ResponseFactory } from '../utils/ResponseFactory.js';

export const listarPorPedido = async (req, res) => {
    try {
        const { id_pedido } = req.params;

        const itens = await obterItensPorPedidoService(id_pedido);

        return ResponseFactory.criarSucesso("Itens do pedido listados com sucesso.", itens).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message, 400).enviar(res);
    }
};