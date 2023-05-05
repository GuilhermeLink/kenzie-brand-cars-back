import { Request, Response } from "express";
import { updateAnnounceService } from "../../services/announce/update";
import { IAnnounceRequest, iUserToken } from "../../interfaces/announce";

export const updateAnnounceController = async (req: Request, res: Response) => {
  const ann: IAnnounceRequest = req.body;
  const id_ann: string = req.params.id;
  const token = req.token as iUserToken;
  const announce = await updateAnnounceService(id_ann, ann, token);
  return res.status(200).json(announce);
};
