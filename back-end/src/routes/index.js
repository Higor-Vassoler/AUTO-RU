import express from "express";
import usuarioRoutes from "./UsuarioRoutes.js";
import produtoRoutes from "./ProdutoRoutes.js";

const router = express.Router();

router.use(usuarioRoutes);
router.use(produtoRoutes);

export default router;