import { listarFormasPagamentoService, criarFormaPagamentoService } from '../services/FormadePagamentoService.js';
import { ResponseFactory } from '../utils/ResponseFactory.js';

export const listar = async (req, res) => {
    try {
        const formas = await listarFormasPagamentoService();
        return ResponseFactory.criarSucesso("Formas de pagamento listadas com sucesso.", formas).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message, 500).enviar(res);
    }
};

export const criar = async (req, res) => {
    try {
        const novaForma = await criarFormaPagamentoService(req.body);
        return ResponseFactory.criarSucesso("Forma de pagamento criada com sucesso.", novaForma, 201).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message, 400).enviar(res);
    }
};