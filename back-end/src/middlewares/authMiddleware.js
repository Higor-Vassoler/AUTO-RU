import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ erro: "Token não fornecido." });
    }

    try {
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        token = token.replace(/^"(.*)"$/, '$1');

        const decodificado = jwt.verify(token, "SENHA");

        req.id_usuario = decodificado.id;
        next();
    } catch (error) {
        console.error("Erro na verificação do token:", error.message);
        return res.status(401).json({ erro: "Token inválido ou expirado." });
    }
};