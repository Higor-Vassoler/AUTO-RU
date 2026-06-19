const express = require("express");
const router = express.Router();
const ProdutoController = require("./produtoController");

// Define que quando houver um POST na raiz desse arquivo, chama o controller
router.post("/", ProdutoController.cadastrar);

module.exports = router;
