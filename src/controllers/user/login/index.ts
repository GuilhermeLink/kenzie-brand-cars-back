import { Request, Response } from "express";
import { iUserLogin } from "../../../interfaces/user";
import { createLoginService } from "../../../services/user/login";

export const createLoginController = async (
  request: Request,
  response: Response
) => {
  const data: iUserLogin = request.body;
  const token = await createLoginService(data);
  return response.status(200).json(token);
};
