import express from 'express';

const router = express.Router();

router.get("/cadastro", (req, res) => {
    const jsonQualquer = [
        // DADOS MOCADOS PARA TESTE
        { id: 1, nome: 'João da Silva', email: 'joao@email.com' },
        { id: 2, nome: 'Maria Souza', email: 'maria@email.com' }
    ];

    return res.status(200).json(jsonQualquer);
});

export default router;