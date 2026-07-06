import { criarUsuarioService, listarUsuariosService, loginService, deletarUsuarioService } from "../services/UsuarioService.js";
import { ResponseFactory } from "../utils/ResponseFactory.js";

// CREATE
export const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, confirmarSenha, ra } = req.body;

        if (senha !== confirmarSenha) {
            return ResponseFactory.erro(res, "As senhas não são iguais.");
        }

        const novoUsuario = await criarUsuarioService(nome, email, senha, ra);

        return ResponseFactory.sucesso(res, "Usuário cadastrado com sucesso.", {
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email
            }
        }, 201);
    } catch (erro) {
        return ResponseFactory.erro(res, erro.message);
    }
};

// LISTAR
export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await listarUsuariosService();

        return ResponseFactory.sucesso(res, "Usuários listados com sucesso.", usuarios);
    } catch (erro) {
        console.error(`Erro ao buscar usuários: ${erro}`);
        return ResponseFactory.erro(res, "Erro interno ao buscar dados.", 500);
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const dadosLogin = await loginService(email, senha);

        return ResponseFactory.sucesso(res, "Login realizado com sucesso.", {
            token: dadosLogin.token,
            is_admin: dadosLogin.is_admin
        });
    } catch (erro) {
        console.error(`Erro no login: ${erro}`);
        return ResponseFactory.erro(res, erro.message);
    }
};

// DELETAR CONTA
export const deletarConta = async (req, res) => {
    try {
        const id = req.id_usuario;

        await deletarUsuarioService(id);

        return ResponseFactory.sucesso(res, "Conta excluída com sucesso.");
    } catch (erro) {
        return ResponseFactory.erro(res, erro.message);
    }
};