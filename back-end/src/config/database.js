import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

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

export default sequelize;