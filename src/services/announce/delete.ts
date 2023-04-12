import { AppDataSource } from "../../data-source";
import { Announce } from "../../entities/entities/announce";
import { AppError } from "../../errors/appError";
import { iUserToken } from "../../interfaces/announce";

export const softdeleteAnnounceService = async (
  id_ann: number,
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

  annExist.softDeleted = true;
  annExist.deletedAt = new Date();
  await annRep.save(annExist);
  return {
    message: "Announce deleted",
  };
};
