import { AppDataSource } from "../../data-source";
import { Announce } from "../../entities/entities/announce";
import { Comment } from "../../entities/entities/comment";
import { User } from "../../entities/entities/user";
import { iUserToken } from "../../interfaces/announce";

export const deleteUserService = async (uuid: string, token: iUserToken) => {
  const userRep = AppDataSource.getRepository(User);
  const exist = await userRep.findOneBy({ id: uuid });
  if (!exist) throw new Error("User not found");

  if (token.user.id !== exist.id && !token.user.admin)
    throw new Error("Unauthorized");

  // Removendo registros relacionados manualmente
  const announceRep = AppDataSource.getRepository(Announce);
  const commentRep = AppDataSource.getRepository(Comment);

  const announces = await announceRep.find({
    where: { owner: { id: exist.id } },
  });
  await announceRep.remove(announces);

  const comments = await commentRep.find({ where: { author: {id: exist.id} } });
  await commentRep.remove(comments);

  // Removendo o usuário
  await userRep.remove(exist);
  return { message: "User deleted" };
};
