import express from "express";
import { criarProduto, listarProdutos } from "../controllers/ProdutoController.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/produtos", upload.single("imagem"), criarProduto);
router.get("/produtos", listarProdutos);

export default router;