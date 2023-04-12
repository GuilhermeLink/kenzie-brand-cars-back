import { Request, Response } from "express";
import { showAnnounceService } from "../../services/announce/get";

export const showAnnounceController = async (req: Request, res: Response) => {
  const announces = await showAnnounceService();
  return res.status(200).json(announces);
};
