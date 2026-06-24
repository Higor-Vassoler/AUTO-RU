import { criarUsuarioService, listarUsuariosService, loginService } from "../services/UsuarioService.js";

// CREATE
export const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, ra } = req.body;

        const novoUsuario = await criarUsuarioService(nome, email, senha, ra);

        return res.status(201).json({
            mensagem: "Usuario cadastrado com sucesso.",
            usuario: novoUsuario
        });
    } catch (erro) {
        console.error(`Erro ao criar usuario: ${erro}`);
        return res.status(500).json({ erro: "Erro interno no servidor." });
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
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};