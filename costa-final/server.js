require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const livroRoutes = require('./routes/livroRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/livros', livroRoutes);
app.use('/api/usuarios', userRoutes)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});