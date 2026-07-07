import express from "express";
import usuarioRoutes from "./UsuarioRoutes.js";
import produtoRoutes from "./ProdutoRoutes.js";
import pedidoRoutes from "./PedidoRoutes.js";
import formadePagamentoRoutes from "./FormadePagamentoRoutes.js";
import itemPedidoRoutes from "./ItemPedidoRoutes.js";

const router = express.Router();

router.use(usuarioRoutes);
router.use(produtoRoutes);
router.use(pedidoRoutes);
router.use(formadePagamentoRoutes);
router.use(itemPedidoRoutes);

export default router;