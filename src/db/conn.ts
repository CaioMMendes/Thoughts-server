import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import database from "./database";
import * as pg from "pg";

export const sequelize = new Sequelize(database.uri!, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
  // host: database.host,
});

export const createDBConnection = async (): Promise<any> => {
  try {
    await sequelize.authenticate();
    return console.log("Conexão com banco de dados bem sucedida");
  } catch (error) {
    console.log("Ocorreu um erro ", error);
  }
};
