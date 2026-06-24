import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import "./models/index.js"
import usuarioRoutes from './routes/usuarioRoutes.js';
import produtoRoutes from './routes/ProdutoRoutes.js';
import pedidoRoutes from './routes/PedidoRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', produtoRoutes);
app.use('/api', pedidoRoutes);

async function iniciarServidor() {
    try {
        await sequelize.sync({ alter: true }); // alter:true || force:true
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