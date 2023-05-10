import { AppDataSource } from "../../data-source";
import { Color } from "../../entities/entities/color";
import { Fuel } from "../../entities/entities/fuel";
import { Mark } from "../../entities/entities/mark";
import { Model } from "../../entities/entities/model";
import { Year } from "../../entities/entities/year";

export const getAllFIltersService = async () => {
  const markRep = await AppDataSource.getRepository(Mark).find();
  const modelRep = await AppDataSource.getRepository(Model).find();
  const fuelRep = await AppDataSource.getRepository(Fuel).find();
  const colorRep = await AppDataSource.getRepository(Color).find();
  const yearRep = await AppDataSource.getRepository(Year).find();
return{
    markFilters: markRep,
    modelFilters: modelRep,
    fuelFilters: fuelRep,
    colorFilters: colorRep,
    yearFilters: yearRep
}
};
