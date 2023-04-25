import dotenv from "dotenv";
dotenv.config();

let database = {
  database: process.env.DATABASE as string,
  user: process.env.USER as string,
  password: process.env.PASSWORD as string,
  host: process.env.HOST as string,
};

if (process.env.NODE_ENV === "test") {
  database = {
    database: process.env.TEST_DATABASE as string,
    user: process.env.TEST_USER as string,
    password: process.env.TEST_PASSWORD as string,
    host: process.env.TEST_HOST as string,
  };
  console.log("ambiente de testes");
}

export default database;
