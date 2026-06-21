import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";

// CREATE
export const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: "Nome, email e senha são obrigatórios." });
        }

        const novoUsuario = await Usuario.create({
            nome: nome,
            email: email,
            senha: senha
        });

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
        const usuarios = await Usuario.findAll();
        return res.status(200).json(usuarios);
    } catch (erro) {
        console.error(`Erro ao buscar usuários: ${erro}`);
        return res.status(500).json({ erro: "Erro interno ao buscar dados." });
    }
};

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({ erro: "E-mail ou senha inválidos." });
        }

        const token = jwt.sign({ id: usuario.id }, "SENHA", { expiresIn: "1h" });

        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            token: token
        });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};