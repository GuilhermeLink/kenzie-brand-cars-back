import { Request, Response } from "express";
import { getAllFIltersService } from "../../services/filter/get";




export const getAllFiltersController = async (req: Request, res: Response) =>{
    
    const response = await getAllFIltersService()
    
    return res.status(200).json(response)
}