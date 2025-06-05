const Livro = require('../models/livro');

exports.listarLivros = async (req, res) => {
    try {
        const { disponivel } = req.query;
        let query = {};
        
        if (disponivel !== undefined) {
            query.disponivel = disponivel === 'true';
        }
        
        const livros = await Livro.find(query);
        res.json(livros);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.obterLivro = async (req, res) => {
    try {
        const livro = await Livro.findById(req.params.id);
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.json(livro);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.criarLivro = async (req, res) => {
    const livro = new Livro({
        titulo: req.body.titulo,
        autor: req.body.autor,
        anoPublicacao: req.body.anoPublicacao,
        disponivel: req.body.disponivel !== undefined ? req.body.disponivel : true
    });

    try {
        const novoLivro = await livro.save();
        res.status(201).json(novoLivro);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.atualizarLivro = async (req, res) => {
    try {
        const livro = await Livro.findById(req.params.id);
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        if (req.body.titulo != null) {
            livro.titulo = req.body.titulo;
        }
        if (req.body.autor != null) {
            livro.autor = req.body.autor;
        }
        if (req.body.anoPublicacao != null) {
            livro.anoPublicacao = req.body.anoPublicacao;
        }
        if (req.body.disponivel != null) {
            livro.disponivel = req.body.disponivel;
        }

        const livroAtualizado = await livro.save();
        res.json(livroAtualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletarLivro = async (req, res) => {
    try {
        const livro = await Livro.findById(req.params.id);
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        
        await livro.deleteOne();
        res.json({ message: 'Livro removido com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};