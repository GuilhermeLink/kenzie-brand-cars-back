import { Comment } from "../../entities/entities/comment";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { ICommentRequest, iUserToken } from "../../interfaces/announce";
import { Announce } from "../../entities/entities/announce";
import { User } from "../../entities/entities/user";

export const createCommentService = async (
  id_ann: string,
  comment: string,
  token: iUserToken
) => {
  const commentRepo = AppDataSource.getRepository(Comment);
  const commentUser = AppDataSource.getRepository(User);
  const annExist = await AppDataSource.getRepository(Announce).findOne({
    where: { id: id_ann },
  });

  if (!annExist) throw new AppError("Announce not found", 404);
  console.log(comment)
  const currentUser = await commentUser.findOne({where: {id: token.id}})
  const createdAt = new Date();
  const createdComment = commentRepo.create({announceId: id_ann, author: currentUser, text: comment, createdAt})
  await commentRepo.save(createdComment)

  return createdComment;
};

export const listCommentsService = async (id_ann: string) => {
    const commentRepo = AppDataSource.getRepository(Comment);
    const comments = await commentRepo.createQueryBuilder("comment")
      .leftJoinAndSelect("comment.user", "user")
      .leftJoinAndSelect("comment.announce", "announce")
      .where("announce.id = :id", { id: id_ann })
      .getMany();
    return comments;
  };