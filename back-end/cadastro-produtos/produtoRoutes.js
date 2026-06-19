const express = require("express");
const router = express.Router();
const ProdutoController = require("./produtoController");

router.post("/", ProdutoController.cadastrar);

module.exports = router;
