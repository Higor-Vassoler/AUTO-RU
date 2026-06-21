import express from "express";
import { criarProduto, listarProdutos } from "../controllers/ProdutoController.js";

const router = express.Router();

router.post("/produtos", criarProduto);
router.get("/produtos", listarProdutos);

export default router;