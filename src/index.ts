require("dotenv").config();

import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source"; // Corrigir a importação do AppDataSource

import cors from "cors";

import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";

import { handleError } from "./middlewares/handleError";
import logger from "./config/winston";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/users", userRouter);
app.use("/login", authRouter);

app.get("/env", (req, res) => {
  res.json({
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
  });
});

app.use(handleError);

// Inicia a conexão com o banco de dados e o servidor
AppDataSource.initialize()
  .then(() => {
    const port = process.env.PORT || 3000; // Use 3000 como fallback se a variável de ambiente não for definida
    app.listen(port, () => {
      logger.info(
        `O servidor está rodando em http://localhost:${port}`
      );
    });
  })
  .catch((error) => {
    logger.erro
