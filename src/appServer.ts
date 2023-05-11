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

const app = express();
const fileStoreOptions = {
  logFn: function () {},
  //   path: require("path").join(require("os").tempdir(), "sessions"),
  path: path.join(os.tmpdir(), "sessions"),
};

app.use(cors(corsOptions));
//receber resposta do body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(credentials);
app.use(cookieParser());
//todo ver como resolver as tipagens disso
app.use(
  session({
    name: "session",
    secret: process.env.SESSIONSECRET as string,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(fileStoreOptions),
    cookie: {
      secure: false,
      maxAge: 360000000000,
      // sameSite: "none",
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);
app.use((req: any, res: Response, next: NextFunction) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log("reqsession", req.session);

  if (req.session.userId) {
    res.locals.session = req.session;
    console.log("tem sessão");
  }
  console.log("session", req.session.userId);
  next();
});
app.use(express.json());
app.use(thougthsRoutes);
app.use(authRoutes);
//session middleware

createDBConnection();
export default app;
