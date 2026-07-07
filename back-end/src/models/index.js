import sequelize from '../config/database.js';
import { Usuario } from './Usuario.js';
import { Produto } from './Produto.js';
import { Pedido } from './Pedido.js';
import { ItemPedido } from './ItemPedido.js';
import { FormadePagamento } from './FormadePagamento.js';

const models = {
    Usuario,
    Produto,
    Pedido,
    ItemPedido,
    FormadePagamento
};

Pedido.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Usuario.hasMany(Pedido, { foreignKey: 'id_usuario' });

Pedido.belongsTo(FormadePagamento, { foreignKey: 'id_forma_pagamento' });
FormadePagamento.hasMany(Pedido, { foreignKey: 'id_forma_pagamento' });

ItemPedido.belongsTo(Pedido, { foreignKey: 'id_pedido', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Pedido.hasMany(ItemPedido, { foreignKey: 'id_pedido', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

ItemPedido.belongsTo(Produto, { foreignKey: 'id_produto', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Produto.hasMany(ItemPedido, { foreignKey: 'id_produto', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

export {
    sequelize,
    Usuario,
    Produto,
    Pedido,
    ItemPedido,
    FormadePagamento
};

export default models;