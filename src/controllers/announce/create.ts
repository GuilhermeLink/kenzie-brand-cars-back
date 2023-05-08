import { Request, Response } from "express";
import { IAnnounceRequest } from "../../interfaces/announce";
import { createAnnounceService } from "../../services/announce/create";
import { Announce } from "../../entities/entities/announce";

export const createAnnounceController = async (req: Request, res: Response) => {
  const data: Announce = req.body;

  const announce = await createAnnounceService(data, req.token.user);
  return res.status(201).json(announce);
};
