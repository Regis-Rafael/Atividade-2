const User = require('../models/user');
o
async function register(req, res) {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    res.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user._id,
        email: user.email,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}

module.exports = { register, login };
