import { Router } from 'express';
import { criarPedido, obterPorId, listarMeusPedidos } from '../controllers/PedidoController.js';
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/pedidos/me', verificarToken, listarMeusPedidos);

router.post('/pedidos/checkout', verificarToken, criarPedido);
router.get('/pedidos/:id/comprovante', verificarToken, obterPorId);

export default router;