import { AppDataSource } from "../../data-source";
import { Announce } from "../../entities/entities/announce";
import { Color } from "../../entities/entities/color";
import { Fuel } from "../../entities/entities/fuel";
import { Mark } from "../../entities/entities/mark";
import { Model } from "../../entities/entities/model";
import { AppError } from "../../errors/appError";
import { IAnnounceRequest, iUserToken } from "../../interfaces/announce";

export const updateAnnounceService = async (
  id_ann: number,
  announce: IAnnounceRequest,
  token: iUserToken
) => {
  const annRep = AppDataSource.getRepository(Announce);
  const annExist = await annRep.findOne({
    where: { id: id_ann },
    relations: ["owner", "mark", "model", "fuel", "color"],
  });

  if (!annExist) throw new AppError("Announce not found", 404);

  if (token.user.id !== annExist.owner.id && !token.user.admin)
    throw new AppError("Unauthorized", 401);

  const { owner, mark, model, fuel, color, ...updateData } = announce;

  if (mark) {
    let markExist = await AppDataSource.getRepository(Mark).findOne({
      where: { name: String(mark) },
    });
    if (!markExist) {
      markExist = new Mark();
      markExist.name = String(mark);
      await AppDataSource.getRepository(Mark).save(markExist);
    }
    annExist.mark = markExist;
  }
  if (model) {
    let modelExist = await AppDataSource.getRepository(Model).findOne({
      where: { name: String(model) },
    });
    if (!modelExist) {
      modelExist = new Model();
      modelExist.name = String(model);
      await AppDataSource.getRepository(Model).save(modelExist);
    }
    annExist.model = modelExist;
  }
  if (fuel) {
    let fuelExist = await AppDataSource.getRepository(Fuel).findOne({
      where: { type: String(fuel) },
    });
    if (!fuelExist) {
      fuelExist = new Fuel();
      fuelExist.type = String(fuel);
      await AppDataSource.getRepository(Fuel).save(fuelExist);
    }
    annExist.fuel = fuelExist;
  }
  if (color) {
    let colorExist = await AppDataSource.getRepository(Color).findOne({
      where: { name: String(color) },
    });
    if (!colorExist) {
      colorExist = new Color();
      colorExist.name = String(color);
      await AppDataSource.getRepository(Color).save(colorExist);
    }
    annExist.color = colorExist;
  }

  Object.assign(annExist, updateData);
  const updatedData = await annRep.save(annExist);
  return updatedData;
};
