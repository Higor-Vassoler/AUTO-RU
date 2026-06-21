import Usuario from './Usuario.js'
import Produto from './Produto.js';
import Pedido from './Pedido.js';

Usuario.hasMany(Pedido, { foreignKey: "id_usuario" });
Pedido.belongsTo(Usuario, { foreignKey: "id_usuario" });

export {
    Usuario,
    Pedido,
    Produto
};