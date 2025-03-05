require("dotenv").config();

import "reflect-metadata";
import express from "express";
<<<<<<< HEAD
import { AppDataSource } from "./data-source";
=======
import { AppDataSource } from "./data-source"; // Corrigir a importação do AppDataSource
>>>>>>> develop

import cors from "cors";

import userRouter from "./routes/user.routes";
<<<<<<< HEAD

import { handleError } from "./middlewares/handleError";

import authRouter from "./routes/auth.routes";
=======
import authRouter from "./routes/auth.routes";

import { handleError } from "./middlewares/handleError";
>>>>>>> develop
import logger from "./config/winston";

const app = express();

<<<<<<< HEAD
app.use(cors()); // Permite que o express entenda requisições de outros domínios

app.use(express.json()); // Permite que o express entenda JSON

=======
// Middleware
app.use(cors());
app.use(express.json());

// Rotas
>>>>>>> develop
app.use("/users", userRouter);
app.use("/login", authRouter);

app.get("/env", (req, res) => {
  res.json({
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
  });
});

app.use(handleError);

<<<<<<< HEAD
AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      logger.info(
        `O servidor está rodando em http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => console.log(error));
=======
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
>>>>>>> develop
