const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

// Rotas CRUD para livros
router.get('/', livroController.listarLivros);
router.get('/:id', livroController.obterLivro);
router.post('/', livroController.criarLivro);
router.put('/:id', livroController.atualizarLivro);
router.patch('/:id', livroController.atualizarLivro);
router.delete('/:id', livroController.deletarLivro);

module.exports = router;