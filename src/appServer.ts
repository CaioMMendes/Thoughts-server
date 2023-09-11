// const os=require('os')
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Response } from "express";
import session from "express-session";
import { Pool } from "pg";
import { corsOptions } from "./config/corsOptions";
import { createDBConnection } from "./db/conn";
import { credentials } from "./middleware/credentials";
import authRoutes from "./routes/authRoutes";
import thougthsRoutes from "./routes/thoughtsRoutes";
const pgSession = require("connect-pg-simple")(session);
const app = express();
app.set("trust proxy", 1);

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

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(credentials);
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSIONSECRET as string,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 1000 * 60 * 60,
      sameSite: "none",
      expires: new Date(Date.now() + 60 * 60 * 1000 * 60 * 60),
      httpOnly: true,
    },
  })
);
app.use((req: any, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
});

app.use(thougthsRoutes);
app.use(authRoutes);

createDBConnection();
export default app;
