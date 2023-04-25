import { Sequelize } from "sequelize";
import database from "./database";

export const sequelize = new Sequelize(
  database.database,
  database.user,
  database.password,

  {
    dialect: "mysql",
    host: database.host,
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
