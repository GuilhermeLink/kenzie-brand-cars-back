import { Request, Response } from "express";
import { showAnnounceIdService, showAnnounceService, showFiltredAnnouncesService } from "../../services/announce/get";
export interface IFilterParams{
  mark?:string,
  fuel?:string,
  model?: string,
  year?: string,
  color?: string
}
export const showAnnounceController = async (req: Request, res: Response) => {
  const filter = req.query as IFilterParams
  if(Object.keys(filter).length > 0){
    const announces = await showFiltredAnnouncesService(filter)
    return res.status(200).json(announces)
  }
  const announces = await showAnnounceService();
  return res.status(200).json(announces);
};
