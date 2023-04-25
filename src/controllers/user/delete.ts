import { Request, Response } from "express";
import { iUserToken } from "../../interfaces/announce";
import { deleteUserService } from "../../services/user/delete";
import { validate as isValidUuid } from "uuid";

export const deleteUserController = async (req: Request, res: Response) => {
  const uuid = req.params.id;
  if (isValidUuid(uuid) === false)
    return res.status(400).json({ message: "UUID is not valid" });
  const token = req.token as iUserToken;

  const data = await deleteUserService(uuid, token);
  return res.status(200).json(data);
};
