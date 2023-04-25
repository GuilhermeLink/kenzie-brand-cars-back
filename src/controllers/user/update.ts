import { Request, Response } from "express";
import { updateUserService } from "../../services/user/update";
import { iUserUpdateRequest } from "../../interfaces/user";
import { iUserToken } from "../../interfaces/announce";
import { validate as isValidUuid } from "uuid";

export const updateUserController = async (req: Request, res: Response) => {
  const uuid = req.params.id;
  if (isValidUuid(uuid) === false)
    return res.status(400).json({ message: "UUID is not valid" });
  const body: iUserUpdateRequest = req.body;
  const token = req.token as iUserToken;

  const data = await updateUserService(uuid, body, token);
  return res.status(200).json(data);
};
