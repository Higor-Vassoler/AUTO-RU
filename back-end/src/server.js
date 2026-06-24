import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import "./models/index.js"
import apiRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

async function iniciarServidor() {
    try {
        // 1. Desativa temporariamente a verificação de chaves estrangeiras
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        // 2. Sincroniza as tabelas (aplica as alterações de colunas como o 'ra')
        await sequelize.sync({ alter: true });

        // 3. Reativa a verificação de chaves estrangeiras para manter a segurança do banco
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