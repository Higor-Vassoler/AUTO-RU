import { DataTypes } from "sequelize";
import sequelize from "../../back-end/src/config/database.js";
import Usuario from "./Usuario.js";

const Pedido = sequelize.define("Pedido", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: "id"
        }
    },
    forma_pagamento: {
        type: DataTypes.ENUM("Pix", "Cartão", "Presencial"),
        allowNull: false
    },
    preco_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "pedidos"
});

export default Pedido;