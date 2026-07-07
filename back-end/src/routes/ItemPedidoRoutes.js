import express from "express";
import { listarPorPedido } from "../controllers/ItemPedidoController.js";

const router = express.Router();

router.get("/pedido/:id_pedido", listarPorPedido);

export default router;