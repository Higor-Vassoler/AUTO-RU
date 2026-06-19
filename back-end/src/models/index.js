import Usuario from './Usuario.js'
import Aluno from './Aluno.js'
import Funcionario from './Funcionario.js';
import Produto from './Produto.js';
import Pedido from './Pedido.js';

Usuario.hasOne(Aluno, { foreignKey: "id_usuario" });
Aluno.belongsTo(Usuario, { foreignKey: "id_usuario" });

Usuario.hasOne(Funcionario, { foreignKey: "id_usuario" });
Funcionario.belongsTo(Usuario, { foreignKey: "id_usuario" });

Usuario.hasMany(Pedido, { foreignKey: "id_usuario" });
Pedido.belongsTo(Usuario, { foreignKey: "id_usuario" });

export {
    Usuario,
    Aluno,
    Funcionario,
    Pedido,
    Produto
};