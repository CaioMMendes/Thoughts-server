import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Op } from "sequelize";
import { user } from "../models/user";
import { thoughts } from "./../models/thoughts";

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
        name: validate?.name,
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
  const cookies = req.cookies;

  if (!cookies?.session) return res.sendStatus(204);
  req.session.destroy((error) => {});
  if (cookies?.session) {
    res.clearCookie("session", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.sendStatus(204);
  }
  return res.sendStatus(200);
};
export const register = async (req: Request, res: any) => {
  const { name, email, password } = req.body;

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
    } catch (error) {}
  }
};
export const userInfo = async (req: Request, res: Response) => {
  if (req?.session?.userId) {
    const id = req.session.userId;
    const validate = await user.findOne({
      where: {
        id,
      },
    });
    return res.json({
      id: validate?.id,
      name: validate?.name,
      email: validate?.email,
      logado: true,
    });
  } else {
    return res.sendStatus(401);
  }
};
export const createThought = async (req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    return res.sendStatus(401);
  }
  if (req?.session?.userId) {
    const title = req.body.title;
    const id = req.session.userId;

    const validate = await thoughts.create({
      title,
      userId: id,
    });
    return res.json({ message: "Criado com sucesso" });
  } else {
    return res.sendStatus(401);
  }
};
export const dashboardThoughts = async (req: Request, res: Response) => {
  if (req?.session?.userId) {
    const id = req.session.userId;

    const validate = await thoughts.findAll({
      where: {
        userId: id,
      },
    });
    return res.json(validate);
  } else {
    return res.sendStatus(401);
  }
};
export const deleteThought = async (req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    return res.sendStatus(401);
  }

  if (req?.body?.id) {
    const id = req.body.id;

    const validate = await thoughts.destroy({
      where: {
        id: id,
      },
    });
    return res.json({ message: "Deletado com sucesso" });
  } else {
    return res.sendStatus(401);
  }
};
export const updateThought = async (req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    return res.sendStatus(401);
  }

  if (req?.body) {
    const { id, title } = req.body;

    const validate = await thoughts.update(
      { title },
      {
        where: {
          id,
        },
      }
    );
    return res.json({ message: "Editado com sucesso" });
  } else {
    return res.sendStatus(401);
  }
};
export const getThoughts = async (req: Request, res: Response) => {
  try {
    const validate = await thoughts.findAll({
      include: {
        model: user,
        attributes: { exclude: ["password"] }, // Exclui o atributo 'password'
      },
    });
    return res.json(validate);
  } catch (error) {
    console.log(error);
  }
};
export const searchThoughts = async (req: Request, res: Response) => {
  if (Object.keys(req?.body).length === 0) {
    return res.sendStatus(401);
  }
  const { search } = req.body;

  try {
    const validate = await thoughts.findAll({
      include: {
        model: user,
        attributes: { exclude: ["password"] }, // Exclui o atributo 'password'
      },
      where: {
        title: { [Op.iLike]: `%${search}%` },
      },
    });
    return res.json(validate);
  } catch (error) {
    console.log(error);
  }
};
