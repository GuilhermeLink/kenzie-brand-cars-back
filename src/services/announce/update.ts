import { AppDataSource } from "../../data-source";
import { Announce } from "../../entities/entities/announce";
import { Color } from "../../entities/entities/color";
import { Fuel } from "../../entities/entities/fuel";
import { Mark } from "../../entities/entities/mark";
import { Model } from "../../entities/entities/model";
import { AppError } from "../../errors/appError";
import { IAnnounceRequest, iUserToken } from "../../interfaces/announce";

async function findOrCreate(repository, where, data) {
  let item = await repository.findOne({ where });

  if (!item) {
    item = repository.create(data);
    await repository.save(item);
  }

  return item;
}

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
    const markRepository = AppDataSource.getRepository(Mark);
    annExist.mark = await findOrCreate(
      markRepository,
      { name: String(mark) },
      { name: String(mark) }
    );
  }
  if (model) {
    const modelRepository = AppDataSource.getRepository(Model);
    annExist.model = await findOrCreate(
      modelRepository,
      { name: String(model) },
      { name: String(model) }
    );
  }
  if (fuel) {
    const fuelRepository = AppDataSource.getRepository(Fuel);
    annExist.fuel = await findOrCreate(
      fuelRepository,
      { type: String(fuel) },
      { type: String(fuel) }
    );
  }
  if (color) {
    const colorRepository = AppDataSource.getRepository(Color);
    annExist.color = await findOrCreate(
      colorRepository,
      { name: String(color) },
      { name: String(color) }
    );
  }

  Object.assign(annExist, updateData);
  const updatedData = await annRep.save(annExist);
  return updatedData;
};
