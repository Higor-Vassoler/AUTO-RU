import express from "express";
import usuarioRoutes from "./UsuarioRoutes.js";

const router = express.Router();

router.use(usuarioRoutes);

export default router;