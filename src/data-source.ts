import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis do arquivo .env

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost", // Definindo valor padrão
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || "postgres", // Definindo valor padrão
  password: process.env.DB_PASSWORD || "", // Definindo valor padrão (use com cautela)
  database: process.env.DB_NAME || "guardachuva", // Definindo valor padrão
  synchronize: false, // Use com cautela em produção
  logging: process.env.NODE_ENV === 'development',
  entities: [`${__dirname}/../entities/*.{ts,js}`], // Ajuste do caminho, caso necessário
  migrations: [`${__dirname}/../migrations/*.{ts,js}`], // Ajuste do caminho, caso necessário
  subscribers: [],
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : undefined,
  migrationsRun: process.env.NODE_ENV === 'production' ? true : false,
});
