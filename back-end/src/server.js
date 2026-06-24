import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import "./models/index.js"


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function iniciarServidor() {
    try {
        await sequelize.sync({ force: true }); // alter:true || force:true
        console.log("✅ Banco de Dados conectado e tabelas sincronizadas!");

        app.listen(PORT, () => {
            console.log(`🚀 Aplicação Rodando na porta ${PORT}.`);
            console.log("➡️  SITE: http://localhost:5173/ ⬅️");
        })
    } catch (error) {
        console.log(`❌ Não foi possível conectar ao banco de dados: (${error}).`);
    }
}

iniciarServidor();