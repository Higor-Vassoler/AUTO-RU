import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Usuario from "./Usuario.js";

const Funcionario = sequelize.define("Funcionario", {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Usuario,
            key: "id"
        }
    }
}, {
    tableName: "funcionarios"
});

export default Funcionario;