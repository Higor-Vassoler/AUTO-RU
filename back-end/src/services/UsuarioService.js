import { Usuario } from "../models/index.js";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

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
        throw new Error("E-mail ou senha incorretos.");
    }

    const token = jwt.sign({ id: usuario.id }, "SENHA", { expiresIn: "24h" });

    return {
        token: token,
        is_admin: usuario.is_admin
    };
};

export const deletarUsuarioService = async (id) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        throw new Error("Usuário não encontrado.");
    }

    await usuario.destroy();

    return true;
};

export const buscarUsuarioPorIdService = async (id) => {
    const usuario = await Usuario.findByPk(id, {
        attributes: ['id', 'nome', 'email', 'ra']
    });

    if (!usuario) {
        throw new Error("Usuário não encontrado.");
    }

    return usuario;
};

export const atualizarUsuarioService = async (id, dadosAtualizados) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        throw new Error("Usuário não encontrado.");
    }

    if (dadosAtualizados.email && dadosAtualizados.email !== usuario.email) {
        const emailExistente = await Usuario.findOne({ where: { email: dadosAtualizados.email } });
        if (emailExistente) {
            throw new Error("Este e-mail já está em uso por outra conta.");
        }
    }

    await usuario.update({
        nome: dadosAtualizados.nome || usuario.nome,
        email: dadosAtualizados.email || usuario.email,
        ra: dadosAtualizados.ra || usuario.ra
    });

    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        ra: usuario.ra
    };
};

export const alterarSenhaService = async (id, novaSenha) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        throw new Error("Usuário não encontrado.");
    }

    const regexSenha = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!regexSenha.test(novaSenha)) {
        throw new Error("Sua nova senha deve ter pelo menos 8 caracteres, incluindo letras, números e símbolos.");
    }

    await usuario.update({ senha: novaSenha });

    return true;
};

export const pesquisarUsuariosService = async (termo) => {
    const condicoes = [
        { nome: { [Op.like]: `%${termo}%` } },
        { email: { [Op.like]: `%${termo}%` } }
    ];

    if (!isNaN(termo) && termo.trim() !== "") {
        condicoes.push({ ra: termo });
    }

    const usuarios = await Usuario.findAll({
        where: {
            [Op.or]: condicoes
        }
    });

    return usuarios;
};

export const alterarPermissaoService = async (id, isAdmin) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        throw new Error("Usuário não encontrado.");
    }

    await usuario.update({ is_admin: isAdmin });

    return {
        id: usuario.id,
        nome: usuario.nome,
        is_admin: usuario.is_admin
    };
};