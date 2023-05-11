import { user } from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Session, SessionData } from "express-session";
// interface MySession extends SessionData {
//   userId?: number;
// }
declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}
interface CustomRequest extends Request {
  json: any;
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.sendStatus(400);
  }
  const validate = await user.findOne({
    where: {
      email,
    },
  });
  if (validate) {
    if (await bcrypt.compare(password, validate.password)) {
      req.session.userId = validate.id;
      return res.json({
        id: validate.id,
        nome: validate?.name,
        email: validate?.email,
      });
    } else {
      return res.json({ error: "E-mail e/ou senha inválidos" });
    }
  } else {
    return res.json({ error: "E-mail e/ou senha inválidos" });
  }
};
export const logout = async (req: Request, res: Response) => {
  console.log(req.session);
  req.session.destroy((error) => {
    console.log(error);
  });
  return res.sendStatus(200);
};
export const register = async (req: Request, res: any) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    return res.sendStatus(400);
  }
  const validate = await user.findOne({
    where: {
      email,
    },
  });
  if (validate) {
    return res.json({ error: "O e-mail já está em uso" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    try {
      const userDb = await user.create({
        name,
        email,
        password: hashPassword,
      });

      req.session.userId = userDb.id;
      return res.status(201).json({ id: userDb.id, name, email });
    } catch (error) {
      console.log(error);
    }
  }
};
export const userInfo = async (req: Request, res: Response) => {
  // console.log(req?.cookies?.session);
  // console.log(req?.session);
  if (req?.session?.userId) {
    const id = req.session.userId;
    const validate = await user.findOne({
      where: {
        id,
      },
    });
    return res.json({
      id: validate?.id,
      nome: validate?.name,
      email: validate?.email,
    });
  }
};
