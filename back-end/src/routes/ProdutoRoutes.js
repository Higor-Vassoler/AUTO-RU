import express from "express";
import { criarProduto } from "../controllers/ProdutoController.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/produtos", upload.single("imagem"), criarProduto);

export default router;