import { AppDataSource } from "../../data-source";
import { Announce } from "../../entities/entities/announce";
import { Color } from "../../entities/entities/color";
import { Fuel } from "../../entities/entities/fuel";
import { Mark } from "../../entities/entities/mark";
import { Model } from "../../entities/entities/model";
import { IAnnounceRequest } from "../../interfaces/announce";
import { instanceToPlain } from "class-transformer";
import { iUserRequest } from "../../interfaces/user";

export const createAnnounceService = async (
  data: Announce,
  owner: iUserRequest
): Promise<IAnnounceRequest> => {
  const annRep = AppDataSource.getRepository(Announce);
  const markRep = AppDataSource.getRepository(Mark);
  const modelRep = AppDataSource.getRepository(Model);
  const fuelRep = AppDataSource.getRepository(Fuel);
  const colorRep = AppDataSource.getRepository(Color);

  const [mark, model, fuel, color] = await Promise.all([
    (async () => {
      const mark_exist = await markRep.findOne({
        where: { name: String(data.mark) },
      });

      if (mark_exist) {
        return mark_exist;
      }

      const mark = markRep.create({ name: String(data.mark) });
      await markRep.save(mark);

      return mark;
    })(),
    (async () => {
      const model_exist = await modelRep.findOne({
        where: { name: String(data.model) },
      });

      if (model_exist) {
        return model_exist;
      }

      const model = modelRep.create({ name: String(data.model) });
      await modelRep.save(model);

      return model;
    })(),
    (async () => {
      const fuel_exist = await fuelRep.findOne({
        where: { type: String(data.fuel) },
      });

      if (fuel_exist) {
        return fuel_exist;
      }

      const fuel = fuelRep.create({ type: String(data.fuel) });
      await fuelRep.save(fuel);

      return fuel;
    })(),
    (async () => {
      const color_exist = await colorRep.findOne({
        where: { name: String(data.color) },
      });

      if (color_exist) {
        return color_exist;
      }

      const color = colorRep.create({ name: String(data.color) });
      await colorRep.save(color);

      return color;
    })(),
  ]);

  const announceData = { ...data, mark, model, fuel, color, owner };
  
  const announce = annRep.create(announceData);
  await annRep.save(announce);

  const plainAnn = instanceToPlain(announce) as IAnnounceRequest;
  return plainAnn;
};
