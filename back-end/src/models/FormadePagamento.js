import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const FormadePagamento = sequelize.define('FormadePagamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "formas_pagamento",
    timestamps: true
});

export default FormadePagamento;