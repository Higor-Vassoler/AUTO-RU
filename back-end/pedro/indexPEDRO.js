const express = require("express");
const cors = require("cors");
const produtoRoutes = require("./produtoRoutes");

const app = express();

app.use(cors());
app.use(express.json()); // Habilita o Express a ler JSON enviado pelo React

// Define que todas as rotas de produtos começarão com /api/produtos
app.use("/api/produtos", produtoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor do cadastro de produtos rodando na porta ${PORT}`);
});
