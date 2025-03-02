import express from 'express';
import { AppDataSource } from './config/data-source'; // Caminho correto para o data-source

const app = express();

// Inicializando a conexão com o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
