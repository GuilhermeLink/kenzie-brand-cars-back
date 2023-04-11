import { Request, Response } from "express";
import { IAnnounceRequest } from "../../interfaces/announce";
import { createAnnounceService } from "../../services/announce/create";

export const createAnnounceController = async (req: Request, res: Response) => {
  const data: IAnnounceRequest = req.body;

  const announce = await createAnnounceService(data, req.token.user);
  return res.status(201).json(announce);
};
