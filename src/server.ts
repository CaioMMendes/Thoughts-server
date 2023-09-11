import dotenv from "dotenv";
import app from "./appServer";
dotenv.config();

app.listen(process.env.port, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
