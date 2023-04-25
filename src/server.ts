import app from "./appServer";
import dotenv from "dotenv";
import { sequelize } from "./db/conn";
dotenv.config();

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Tabela sincronizada com sucesso!");
//   })
//   .catch((error) => {
//     console.error("Não foi possível sincronizar a tabela:", error);
//   });

app.listen(process.env.port, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
