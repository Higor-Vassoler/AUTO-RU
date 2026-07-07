import express from "express";
import { criarUsuario, listarUsuarios, login, deletarConta, buscarMeusDados, atualizarConta, alterarSenha, pesquisarUsuarios } from "../controllers/UsuarioController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/usuarios", criarUsuario);
router.post("/login", login);
router.get("/usuarios", listarUsuarios);
router.get("/usuarios/pesquisa", pesquisarUsuarios);

router.get("/usuarios/me", verificarToken, buscarMeusDados);
router.put("/usuarios/me", verificarToken, atualizarConta);
router.delete("/usuarios/me", verificarToken, deletarConta);
router.put("/usuarios/me/senha", verificarToken, alterarSenha);

export default router;