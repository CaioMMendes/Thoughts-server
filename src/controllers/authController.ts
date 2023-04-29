import { user } from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Request) => {};
export const logout = async (req: Request, res: Request) => {};
export const register = async (req: Request, res: any) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
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
      //   req.session.userId=userDb.id
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json({ name, email });
  }
};
