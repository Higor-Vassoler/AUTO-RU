import express from "express";
import { obterItensPorPedido } from "../controllers/ItemPedidoController.js";

const router = express.Router();
router.get("/pedido/:id_pedido", obterItensPorPedido);

export default router;