import { Usuario } from "../models/index.js";
import jwt from "jsonwebtoken";

export const criarUsuarioService = async (nome, email, senha, ra) => {
    if (!nome || !email || !senha || !ra) {
        throw new Error("Todos os campos (Nome, E-mail, Matrícula e Senha) são obrigatórios.");
    }

    const regexSenha = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!regexSenha.test(senha)) {
        throw new Error("Sua senha deve ter pelo menos 8 caracteres, incluindo letras, números e símbolos.");
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
        throw new Error("Este e-mail já possui uma conta cadastrada.");
    }

    const novoUsuario = await Usuario.create({
        nome,
        email,
        senha,
        ra
    });

    return novoUsuario;
};

export const listarUsuariosService = async () => {
    const usuarios = await Usuario.findAll();
    return usuarios;
};

export const loginService = async (email, senha) => {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || usuario.senha !== senha) {
        throw new Error("E-mail ou senha inválidos.");
    }

    const token = jwt.sign({ id: usuario.id }, "SENHA", { expiresIn: "1h" });

    return token;
};

export const deletarUsuarioService = async (id) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        throw new Error("Usuário não encontrado.");
    }

    await usuario.destroy();

    return true;
};