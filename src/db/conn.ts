import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import database from "./database";
import * as pg from "pg";
console.log("🚀", process.env.URI_DATABASE!);
console.log("✏", database.uri);
export const sequelize = new Sequelize(
  // database.database,
  // database.user,
  // database.password,
  database.uri!,
  {
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    // host: database.host,
  }
);

export const createDBConnection = async (): Promise<any> => {
  try {
    await sequelize.authenticate();
    return console.log("Conexão com banco de dados bem sucedida");
  } catch (error) {
    console.log("Ocorreu um erro ", error);
  }
};
