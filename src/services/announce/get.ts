import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { Announce } from "../../entities/entities/announce";
import { IAnnounceRequest } from "../../interfaces/announce";

export const showAnnounceService = async () => {
  const annRep = AppDataSource.getRepository(Announce);
  const announce = await annRep.find({
    relations: ["mark", "model", "fuel", "color", "owner"],
  });

  const plainAnn = instanceToPlain(announce) as IAnnounceRequest[];

  return plainAnn.map((a) => ({
    ...a,
    mark: a.mark ? a.mark.name : null,
    model: a.model ? a.model.name : null,
    fuel: a.fuel ? a.fuel.type : null,
    color: a.color ? a.color.name : null,
    owner: {
      name: a.owner.name,
      email: a.owner.email,
      cpf: a.owner.cpf,
      phone: a.owner.phone,
      birthDate: a.owner.birthDate,
      description: a.owner.description,
      type: a.owner.type,
      admin: a.owner.admin,
    },
  }));
};
