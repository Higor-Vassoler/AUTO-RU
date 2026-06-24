import express from "express";
import { criarPedido, listarPedidos } from "../controllers/PedidoController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/pedidos", verificarToken, criarPedido);
router.get("/pedidos", verificarToken, listarPedidos)

export default router;