import { Router } from 'express';
import { criarPedido, obterPorId } from '../controllers/PedidoController.js';
import { autenticarJWT } from '../middlewares/auth.js';

const router = Router();

router.post('/pedidos/checkout', autenticarJWT, criarPedido);
router.get('/pedidos/:id/comprovante', autenticarJWT, obterPorId);

export default router;