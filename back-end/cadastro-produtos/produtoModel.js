const db = require("../../bd/cadastro-produtos/db");

const ProdutoModel = {
  salvar: async (produto) => {
    const query = `
      INSERT INTO Produto (id_produto, nome, descricao, preco_unitario, quantidade_estoque)
      VALUES (?, ?, ?, ?, ?)
    `;

    const valores = [
      produto.id_produto,
      produto.nome,
      produto.descricao,
      produto.preco_unitario,
      produto.quantidade_estoque,
    ];

    const [resultado] = await db.execute(query, valores);
    return resultado;
  },
};

module.exports = ProdutoModel;
