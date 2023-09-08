import dotenv from "dotenv";
dotenv.config();

let database = {
  uri: process.env.URI_DATABASE,
};

export default database;
