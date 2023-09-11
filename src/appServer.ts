import path from "path";
// const os=require('os')
import os from "os";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
// import FileStore from "session-file-store";
var FileStore = require("session-file-store")(session);
import { createDBConnection } from "./db/conn";
import thougthsRoutes from "./routes/thoughtsRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import { credentials } from "./middleware/credentials";
import { corsOptions } from "./config/corsOptions";
import cookieParser from "cookie-parser";
const pgSession = require("connect-pg-simple")(session);
const { Pool } = require("pg");
const app = express();
const fileStoreOptions = {
  logFn: function () {},
  path: path.join(os.tmpdir(), "sessions"),
};
const pool = new Pool({
  connectionString: `${process.env.URI_DATABASE}?sslmode=require`,
});
const store = new pgSession({
  pool: pool,
  tableName: "session",
});
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ACEPTEDROUTES1); // Substitua pelo domínio permitido
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//receber resposta do body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(credentials);
app.use(express.json());
app.use(cookieParser());
//todo ver como resolver as tipagens disso
app.use(
  session({
    //todo por algum motivo ele não salva a session e o cookie nos cookies
    //todo na hora de mandar no deploy não chega nada
    // name: "session",
    secret: process.env.SESSIONSECRET as string,
    resave: false,
    saveUninitialized: false,
    // store: new FileStore(fileStoreOptions),
    store: store,
    cookie: {
      secure: true,
      // secure: true,
      maxAge: 60 * 60 * 1000 * 60 * 60,
      sameSite: "none",
      // domain:,
      expires: new Date(Date.now() + 60 * 60 * 1000 * 60 * 60),
      httpOnly: true,
    },
    // cookie: {
    //   secure: false,
    //   sameSite: "lax",
    // },
  })
);
app.use((req: any, res: Response, next: NextFunction) => {
  const key = process.env.SESSIONSECRET;
  console.log("🦁", req.session.userId);
  console.log("🦁", req.session);

  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
});
// Middleware personalizado para recuperar a sessão do banco de dados
// app.use(async (req, res, next) => {
//   console.log("🦁", req.session.userId);
//   if (req.session.userId) {
//     // Você pode fazer uma consulta ao banco de dados para recuperar os dados da sessão com base no ID da sessão
//     const client = await pool.connect();
//     try {
//       const result = await client.query(
//         "SELECT * FROM session WHERE sid = $1",
//         [req.sessionID]
//       );
//       if (result.rows.length > 0) {
//         // Recupere os dados da sessão do banco de dados
//         req.session = result.rows[0].sess;
//       }
//     } finally {
//       client.release();
//     }
//   }

//   next();
// });

app.use(thougthsRoutes);
app.use(authRoutes);
//session middleware

createDBConnection();
export default app;
