import { FormadePagamento } from '../models/index.js';

export const listarFormasPagamentoService = async () => {
    return await FormadePagamento.findAll();
};

export const criarFormaPagamentoService = async (dados) => {
    if (!dados.nome) {
        throw new Error("O nome da forma de pagamento é obrigatório.");
    }
    return await FormadePagamento.create(dados);
};