export const ResponseFactory = {
    sucesso: (res, mensagem, dados = null, status = 200) => {
        const payload = { sucesso: true, mensagem };
        if (dados) payload.dados = dados;

        return res.status(status).json(payload);
    },

    erro: (res, mensagem, status = 400) => {
        return res.status(status).json({ sucesso: false, erro: mensagem });
    }
};