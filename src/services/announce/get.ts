import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { Announce } from "../../entities/entities/announce";
import { IAnnounceRequest } from "../../interfaces/announce";
import { AppError } from "../../errors/appError";
import { IFilterParams } from "../../controllers/announce/get";

export const showAnnounceService = async () => {
  const annRep = AppDataSource.getRepository(Announce);
  const announce = await annRep.find({
    where: { softDeleted: false },
    relations: ["mark", "model", "fuel", "color", "owner", "year"],
  });

  const plainAnn = instanceToPlain(announce) as IAnnounceRequest[];

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
    },
  }));
};


export const showAnnounceIdService = async (id: string) => {
  const annRep = AppDataSource.getRepository(Announce)

  const announce = await annRep.findOne({
      where: {
          id: id
      }
  })

  if(!announce){
      throw new AppError('Invalid Id', 404)
  }

  return announce
}
export const showFiltredAnnouncesService = async (payload: IFilterParams) => {
  const annRep = AppDataSource.getRepository(Announce)
  const anouncesFound = await annRep.find({
    where:{
      year: {year: payload.year},
      color: {name: payload.color},
      mark : {name: payload.mark},
      model: {name: payload.model},
      fuel: {type: payload.fuel}
    },
    relations: ["mark", "model", "fuel", "color", "owner", "year"]
  })
  const plainAnn = instanceToPlain(anouncesFound) as IAnnounceRequest[];

  return plainAnn.map((a) => ({
    ...a,
    mark: a.mark ? a.mark.name : null,
    model: a.model ? a.model.name : null,
    fuel: a.fuel ? a.fuel.type : null,
    color: a.color ? a.color.name : null,
    year: a.year ? a.year.year : null,
    owner: {
      id: a.owner.id,
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

