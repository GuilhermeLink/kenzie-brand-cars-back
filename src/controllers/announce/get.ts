import { Request, Response } from "express";
import { showAnnounceIdService, showAnnounceService } from "../../services/announce/get";

export const showAnnounceController = async (req: Request, res: Response) => {
  const announces = await showAnnounceService();
  return res.status(200).json(announces);
};

export const showAnnounceIdController = async (req: Request, res: Response) => {
  const announceId = req.params.id
  const announces = await showAnnounceIdService(announceId);
  return res.status(200).json(announces);
};
