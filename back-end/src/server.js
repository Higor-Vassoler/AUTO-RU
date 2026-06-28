import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import sequelize from './config/database.js';
import "./models/index.js"
import apiRoutes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', apiRoutes);

async function iniciarServidor() {
    try {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        // await sequelize.sync({ alter: true });

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log("✅ Banco de Dados conectado e tabelas sincronizadas!");

        app.listen(PORT, () => {
            console.log(`🚀 Aplicação Rodando na porta ${PORT}.`);
            console.log("➡️  SITE: http://localhost:5173/ ⬅️");
        });
    } catch (error) {
        console.log(`❌ Não foi possível conectar ao banco de dados: (${error}).`);
    }
}

iniciarServidor();