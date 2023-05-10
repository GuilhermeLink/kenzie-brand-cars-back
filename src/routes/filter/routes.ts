import { Router } from "express";
import { getAllFiltersController } from "../../controllers/filter/get";



export const filterRoutes = Router()

filterRoutes.get('', getAllFiltersController)