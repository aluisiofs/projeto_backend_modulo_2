import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "@models/User";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente
dotenv.config();

export const login: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  // Validação dos campos de entrada
  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  try {
    // Procurando o usuário no banco de dados pelo email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Usuário ou senha inválidos." });
    }

    // Comparando a senha fornecida com o hash armazenado no banco
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: "Usuário ou senha inválidos." });
    }

    // Gerando o token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, profile: user.profile },
      process.env.JWT_SECRET as string,  // Certifique-se de que a chave JWT está definida nas variáveis de ambiente
      { expiresIn: "8h" }
    );

    // Retornando a resposta com o token e as informações do usuário
    return res.status(200).json({
      token,
      user: { name: user.name, profile: user.profile },
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
};
