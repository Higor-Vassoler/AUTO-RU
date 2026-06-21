import express from "express";
import { criarUsuario, listarUsuarios, login } from "../controllers/UsuarioController.js";

const router = express.Router();

router.post("/usuarios", criarUsuario);
router.post("/login", login);
router.get("/usuarios", listarUsuarios);

export default router;