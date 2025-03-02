const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
require("dotenv").config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica
  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  try {
    // Buscar usuário pelo email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Usuário ou senha inválidos." });
    }

    // Comparar a senha digitada com o hash no banco
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: "Usuário ou senha inválidos." });
    }

    // Criar token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, profile: user.profile },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Retornar o token e os dados do usuário
    res.status(200).json({
      token,
      user: { name: user.name, profile: user.profile },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
