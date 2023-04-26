import { Request, Response } from "express";
import { iUserRequest } from "../../interfaces/user";
import { createUserService } from "../../services/user/create";

export const createUserController = async (req: Request, res: Response) => {
  const data: iUserRequest = req.body;
  const user = await createUserService(data);
  return res.status(201).json(user);
};
