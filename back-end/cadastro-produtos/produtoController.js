const ProdutoModel = require("./produtoModel");

const ProdutoController = {
  cadastrar: async (req, res) => {
    try {
      const { id, nome, venda, estoque, descricao } = req.body;

      const precoFormatado = parseFloat(venda.replace(",", "."));

      const novoProduto = {
        id_produto: id,
        nome: nome,
        descricao: descricao,
        preco_unitario: precoFormatado,
        quantidade_estoque: parseInt(estoque),
      };

      await ProdutoModel.salvar(novoProduto);

      return res
        .status(201)
        .json({ mensagem: "Produto cadastrado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ erro: "Erro ao salvar o produto no banco de dados." });
    }
  },
};

module.exports = ProdutoController;
