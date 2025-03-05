import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

// Carregar as variáveis de ambiente do .env
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Sincroniza com o banco de dados em desenvolvimento
  logging: true, // Habilita o logging
  entities: [
    "src/models/*.ts", // Aqui você deve adicionar os modelos da sua aplicação
  ],
  migrations: [],
  subscribers: [],
});
