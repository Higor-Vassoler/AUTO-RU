import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';

import cadastroRoutes from './routes/cadastroRoutes.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", cadastroRoutes);

async function iniciarServidor() {
    try {
        await sequelize.authenticate();
        console.log("✅ Banco de Dados conectado!");

        app.listen(PORT, () => {
            console.log(`🚀 Aplicação Rodando na porta ${PORT}.`);
        })
    } catch (error) {
        console.log(`❌ Não foi possível conectar ao banco de dados: (${error}).`);
    }
}

iniciarServidor();