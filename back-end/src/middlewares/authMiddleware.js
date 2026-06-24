import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ erro: "Token não fornecido." });
    }

    try {
        const decodificado = jwt.verify(token, "SENHA")

        req.id_usuario = decodificado.id;
        next();
    } catch (error) {
        return res.status(401).json({ erro: "Token inválido." });
    }
};