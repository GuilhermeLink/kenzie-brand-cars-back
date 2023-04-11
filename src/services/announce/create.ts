import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { Announce } from "../../entities/entities/announce";
import { IAnnounceRequest } from "../../interfaces/announce";

export const createAnnounceService = async (
  data: IAnnounceRequest
): Promise<IAnnounceRequest> => {
  const annRep = AppDataSource.getRepository(Announce);
  const title = data.title;
  const announce = annRep.create(title as any);
  await annRep.save(announce);
  const plainAnn = instanceToPlain(announce) as IAnnounceRequest;
  return plainAnn;
};
