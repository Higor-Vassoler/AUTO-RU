class RespostaHttp {
    constructor(status, payload) {
        this.status = status;
        this.payload = payload;
    }

    enviar(res) {
        return res.status(this.status).json(this.payload);
    }
}

class RespostaSucesso extends RespostaHttp {
    constructor(mensagem, dados = null, status = 200) {
        const payload = { sucesso: true, mensagem };
        if (dados) payload.dados = dados;

        super(status, payload);
    }
}

class RespostaErro extends RespostaHttp {
    constructor(mensagem, status = 400) {
        super(status, { sucesso: false, erro: mensagem });
    }
}

export class ResponseFactory {
    static criarSucesso(mensagem, dados = null, status = 200) {
        return new RespostaSucesso(mensagem, dados, status);
    }

    static criarErro(mensagem, status = 400) {
        return new RespostaErro(mensagem, status);
    }

    static criar(tipo, mensagem, dadosOuStatus, statusOpcional) {
        if (tipo === 'SUCESSO') {
            return new RespostaSucesso(mensagem, dadosOuStatus, statusOpcional || 200);
        } else if (tipo === 'ERRO') {
            return new RespostaErro(mensagem, dadosOuStatus || 400);
        }
        throw new Error("Tipo de resposta não suportado pela fábrica.");
    }
}