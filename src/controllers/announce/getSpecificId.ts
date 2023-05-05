import { Request, Response } from "express";
import { showSpecifiAnnounceService } from "../../services/announce/getById";



export const showSpecifiAnnounceController = async (req: Request, res: Response) =>{
   const {id} = req.params
    const announce = await showSpecifiAnnounceService(parseFloat(id))
    return res.status(200).json(announce[0])

}