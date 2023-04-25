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

const app = express();

//receber resposta do body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(thougthsRoutes);
app.use(authRoutes);
//session middleware

const fileStoreOptions = {
  logFn: function () {},
  //   path: require("path").join(require("os").tempdir(), "sessions"),
  path: path.join(os.tmpdir(), "sessions"),
};
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
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);
app.use((req: any, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }
});

createDBConnection();
export default app;
