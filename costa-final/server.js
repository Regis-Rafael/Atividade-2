require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const livroRoutes = require('./routes/livroRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/livros', livroRoutes);
app.use('/api/usuarios', userRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Conectado ao MongoDB no Docker (Porta 27000)'))
    .catch(err => {
        console.error('❌ Erro na conexão com MongoDB:', err.message);
        console.log('👉 Verifique se:');
        console.log('1. Docker Desktop está rodando');
        console.log('2. Container MongoDB está ativo (docker ps)');
        console.log('3. As credenciais no .env estão corretas');
        process.exit(1);
    });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});