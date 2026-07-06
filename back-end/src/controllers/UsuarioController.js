import { criarUsuarioService, listarUsuariosService, loginService, deletarUsuarioService, atualizarUsuarioService, buscarUsuarioPorIdService, alterarSenhaService } from "../services/UsuarioService.js";
import { ResponseFactory } from "../utils/ResponseFactory.js";

// CREATE
export const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, confirmarSenha, ra } = req.body;

        if (senha !== confirmarSenha) {
            return ResponseFactory.criarErro("As senhas não são iguais.").enviar(res);
        }

        const novoUsuario = await criarUsuarioService(nome, email, senha, ra);

        return ResponseFactory.criarSucesso("Usuário cadastrado com sucesso.", {
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email
            }
        }, 201).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message).enviar(res);
    }
};

// LISTAR
export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await listarUsuariosService();

        return ResponseFactory.criarSucesso("Usuários listados com sucesso.", usuarios).enviar(res);
    } catch (erro) {
        console.error(`Erro ao buscar usuários: ${erro}`);
        return ResponseFactory.criarErro("Erro interno ao buscar dados.", 500).enviar(res);
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const dadosLogin = await loginService(email, senha);

        return ResponseFactory.criarSucesso("Login efetuado com sucesso.", dadosLogin).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message, 401).enviar(res);
    }
};

// DELETE
export const deletarConta = async (req, res) => {
    try {
        const id = req.id_usuario;
        await deletarUsuarioService(id);

        return ResponseFactory.criarSucesso("Conta excluída com sucesso.").enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message).enviar(res);
    }
};

// BUSCAR MEUS DADOS
export const buscarMeusDados = async (req, res) => {
    try {
        const id = req.id_usuario;
        const usuario = await buscarUsuarioPorIdService(id);

        return ResponseFactory.criarSucesso("Dados do usuário buscados com sucesso.", usuario).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message, 404).enviar(res);
    }
};

// ATUALIZAR CONTA
export const atualizarConta = async (req, res) => {
    try {
        const id = req.id_usuario;
        const { nome, email, ra } = req.body;

        const usuarioAtualizado = await atualizarUsuarioService(id, { nome, email, ra });

        return ResponseFactory.criarSucesso("Dados atualizados com sucesso!", { usuario: usuarioAtualizado }).enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message).enviar(res);
    }
};

// ALTERAR SENHA
export const alterarSenha = async (req, res) => {
    try {
        const id = req.id_usuario;
        const { novaSenha } = req.body;

        if (!novaSenha) {
            return ResponseFactory.criarErro("A nova senha é obrigatória.").enviar(res);
        }

        await alterarSenhaService(id, novaSenha);

        return ResponseFactory.criarSucesso("Senha alterada com sucesso!").enviar(res);
    } catch (erro) {
        return ResponseFactory.criarErro(erro.message).enviar(res);
    }
};