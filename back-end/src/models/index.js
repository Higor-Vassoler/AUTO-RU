import sequelize from "../config/database.js";
import Usuario from "./Usuario.js";
import Produto from "./Produto.js";
import FormadePagamento from "./FormadePagamento.js";
import Pedido from "./Pedido.js";
import ItemPedido from "./ItemPedido.js";

Usuario.hasMany(Pedido, { foreignKey: "id_usuario", as: "pedidos" });
Pedido.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });

FormadePagamento.hasMany(Pedido, { foreignKey: "id_forma_pagamento", as: "pedidos" });
Pedido.belongsTo(FormadePagamento, { foreignKey: "id_forma_pagamento", as: "formaPagamento" });

Pedido.hasMany(ItemPedido, { foreignKey: "id_pedido", as: "itens" });
ItemPedido.belongsTo(Pedido, { foreignKey: "id_pedido", as: "pedido" });

Produto.hasMany(ItemPedido, { foreignKey: "id_produto", as: "itens" });
ItemPedido.belongsTo(Produto, { foreignKey: "id_produto", as: "produto" });

export {
    sequelize,
    Usuario,
    Produto,
    FormadePagamento,
    Pedido,
    ItemPedido
};