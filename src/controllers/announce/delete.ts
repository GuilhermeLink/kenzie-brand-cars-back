import { Request, Response } from "express";
import { iUserToken } from "../../interfaces/announce";
import { softdeleteAnnounceService } from "../../services/announce/delete";

export const softdeleteAnnounceController = async (
  req: Request,
  res: Response
) => {
  const id_ann: number = Number(req.params.id);
  const token = req.token as iUserToken;
  const announce = await softdeleteAnnounceService(id_ann, token);
  return res.status(200).json(announce);
};
