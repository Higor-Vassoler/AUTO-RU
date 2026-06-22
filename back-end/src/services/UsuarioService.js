import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";

export const criarUsuarioService = async (nome, email, senha, ra) => {
    if (!nome || !email || !senha) {
        throw new Error("Nome, email e senha são obrigatórios.");
    }

    const novoUsuario = await Usuario.create({
        nome: nome,
        email: email,
        senha: senha,
        ra: ra
    });

    return novoUsuario;
};

export const listarUsuariosService = async () => {
    const usuarios = await Usuario.findAll();
    return usuarios;
};

export const loginService = async (email, senha) => {
    const usuario = await Usuario.findOne({ whre: { email } });

    if (!usuario || usuario.senha !== senha) {
        throw new Error("E-mail ou senha inválidos.");
    }

    const token = jwt.sign({ id: usuario.id }, "SENHA", { expiresIn: "1h" });

    return token;
};