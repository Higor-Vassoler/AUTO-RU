import { DataTypes } from "sequelize";
import sequelize from "../../back-end/src/config/database.js";

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ra: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: "usuarios"
});

export default Usuario;