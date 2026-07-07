import express from 'express';
import { listar, criar } from '../controllers/FormadePagamentoController.js';

const router = express.Router();

router.get('/formas-pagamento', listar);
router.post('/formas-pagamento', criar);

export default router;