import express from "express";
import { criarUsuario, listarUsuarios, login, deletarConta } from "../controllers/UsuarioController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/usuarios", criarUsuario);
router.post("/login", login);
router.get("/usuarios", listarUsuarios);
router.delete("/usuarios/me", verificarToken, deletarConta);

export default router;