import express from "express";
import { criarProduto, listarProdutos, ocultarProduto } from "../controllers/ProdutoController.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/produtos", upload.single("imagem"), criarProduto);
router.get("/produtos", listarProdutos);
router.patch("/produtos/:id/ocultar", ocultarProduto);

export default router;