import { criarUsuarioService, listarUsuariosService, loginService, deletarUsuarioService } from "../services/UsuarioService.js";

// CREATE
export const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, confirmarSenha, ra } = req.body;

        if (senha !== confirmarSenha) {
            return res.status(400).json({ erro: "As senha não são iguais." });
        }

        const novoUsuario = await criarUsuarioService(nome, email, senha, ra);

        return res.status(201).json({
            mensagem: "Usuario cadastrado com sucesso.",
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email
            }
        });
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
};

// LISTAR
export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await listarUsuariosService();
        return res.status(200).json(usuarios);
    } catch (erro) {
        console.error(`Erro ao buscar usuários: ${erro}`);
        return res.status(500).json({ erro: "Erro interno ao buscar dados." });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const token = await loginService(email, senha);

        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            token: token
        });
    } catch (erro) {
        console.error(`Erro no login: ${erro}`);

        if (erro.message === "E-mail ou senha inválidos.") {
            return res.status(401).json({ erro: erro.message });
        }

        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};

export const deletarConta = async (req, res) => {
    try {
        // O id_usuario vem do authMiddleware.js
        const id = req.id_usuario;

        await deletarUsuarioService(id);

        return res.status(200).json({ mensagem: "Conta excluída com sucesso." });
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
};