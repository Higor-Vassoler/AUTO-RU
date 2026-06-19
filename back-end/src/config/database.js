const { Sequelize } = require('sequelize');
require('dotenv').config();

const DotEnv = process.env;

const sequelize = new Sequelize(
    DotEnv.DB_NAME,
    DotEnv.DB_USER,
    DotEnv.DB_PASS,
    {
        host: DotEnv.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

module.exports = sequelize;