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
  data: IAnnounceRequest,
  owner: iUserRequest
): Promise<IAnnounceRequest> => {
  const annRep = AppDataSource.getRepository(Announce);
  const markRep = AppDataSource.getRepository(Mark);
  const modelRep = AppDataSource.getRepository(Model);
  const fuelRep = AppDataSource.getRepository(Fuel);
  const colorRep = AppDataSource.getRepository(Color);

  const mark =
    (await markRep.findOne({ where: { name: data.mark.name } })) ||
    markRep.create(data.mark);
  if (!mark.id) {
    await markRep.save(mark);
  }

  const model =
    (await modelRep.findOne({ where: { name: data.model.name } })) ||
    modelRep.create(data.model);
  if (!model.id) {
    await modelRep.save(model);
  }

  const fuel =
    (await fuelRep.findOne({ where: { type: data.fuel.type } })) ||
    fuelRep.create(data.fuel);
  if (!fuel.id) {
    await fuelRep.save(fuel);
  }

  const color =
    (await colorRep.findOne({ where: { name: data.color.name } })) ||
    colorRep.create(data.color);
  if (!color.id) {
    await colorRep.save(color);
  }

  const announceData = { ...data, mark, model, fuel, color, owner };
  const announce = annRep.create(announceData);
  await annRep.save(announce);

  const plainAnn = instanceToPlain(announce) as IAnnounceRequest;
  return plainAnn;
};
