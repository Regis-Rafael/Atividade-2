const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    anoPublicacao: {
        type: Number,
        required: true
    },
    disponivel: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Livro', livroSchema);