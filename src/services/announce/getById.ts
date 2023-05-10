import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { Announce } from "../../entities/entities/announce";
import { AppError } from "../../errors/appError";
import { IAnnounceRequest } from "../../interfaces/announce";

export const showSpecifiAnnounceService = async (id: string) => {
  const annRep = AppDataSource.getRepository(Announce);
  const announceFound = await annRep.find({
    where: { id: id },
    relations: ["mark", "model", "fuel", "color", "owner", "comments",'comments.author', "year"],
  });
  if (!announceFound) {
    throw new AppError("Deu ruim", 404);
  } else {
    const plainAnn = instanceToPlain(announceFound) as IAnnounceRequest[]
    return plainAnn.map((a) => ({
      ...a,
      mark: a.mark ? a.mark.name : null,
      model: a.model ? a.model.name : null,
      fuel: a.fuel ? a.fuel.type : null,
      color: a.color ? a.color.name : null,
      year: a.year ? a.year.year : null,
      owner: {
        name: a.owner.name,
        id: a.owner.id,
        email: a.owner.email,
        cpf: a.owner.cpf,
        phone: a.owner.phone,
        birthDate: a.owner.birthDate,
        description: a.owner.description,
        type: a.owner.type,
        admin: a.owner.admin,
      }
    }));
  }
};
