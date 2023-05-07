import { Comment } from "../../entities/entities/comment";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { ICommentRequest, iUserToken } from "../../interfaces/announce";
import { Announce } from "../../entities/entities/announce";

export const createCommentService = async (
  id_ann: string,
  comment: ICommentRequest,
  token: iUserToken
) => {
  const commentRepo = AppDataSource.getRepository(Comment);
  const annExist = await AppDataSource.getRepository(Announce).findOne({
    where: { id: id_ann },
    relations: ["owner", "mark", "model", "fuel", "color"],
  });

  if (!annExist) throw new AppError("Announce not found", 404);

  const newComment = new Comment();
  newComment.text = comment.text;
  newComment.author = {
    id: token.user.id,
    name: token.user.name,
    email: token.user.email,
    cpf: token.user.cpf,
    phone: token.user.phone,
    birthDate: token.user.birthDate,
    description: token.user.description,
    type: token.user.type,
    admin: token.user.admin,
    address: token.user.address,
    password: token.user.password,
    hashPassword: token.user.hashPassword,
    reset_token: token.user.reset_token
  };
  newComment.announce = annExist;

  const createdComment = await commentRepo.save(newComment);

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