import { Request, Response, NextFunction } from "express";
export const credentials = (req: Request, res: any, next: NextFunction) => {
  const allowedOrigins = [
    process.env.ACEPTEDROUTES1,
    process.env.ACEPTEDROUTES2,
  ];
  const origin: any = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
