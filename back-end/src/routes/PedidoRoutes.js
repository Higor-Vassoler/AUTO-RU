import { Router } from 'express';
import { criarPedido, obterPorId } from '../controllers/PedidoController.js';
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/pedidos/checkout', verificarToken, criarPedido);
router.get('/pedidos/:id/comprovante', verificarToken, obterPorId);

export default router;