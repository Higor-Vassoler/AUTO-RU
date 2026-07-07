import { listarFormasPagamentoService, criarFormaPagamentoService } from '../services/FormadePagamentoService.js';

export const listar = async (req, res) => {
    try {
        const formas = await listarFormasPagamentoService();
        return res.status(200).json(formas);
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.message });
    }
};

export const criar = async (req, res) => {
    try {
        const novaForma = await criarFormaPagamentoService(req.body);
        return res.status(201).json(novaForma);
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
};