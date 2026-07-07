import express from 'express';
import { listar, criar } from '../controllers/FormadePagamentoController.js';

const router = express.Router();

router.get('/', listar);
router.post('/', criar);

export default router;