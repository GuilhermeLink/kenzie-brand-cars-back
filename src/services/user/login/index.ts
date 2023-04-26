import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { iUserLogin } from "../../../interfaces/user";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/entities/user";
import { AppError } from "../../../errors/appError";
import { instanceToPlain } from "class-transformer";

export const createLoginService = async (data: iUserLogin): Promise<Object> => {
  const { email, password } = data;

  const userRep = AppDataSource.getRepository(User);
  const user = await userRep.findOne({ where: { email } });

  if (!user) throw new AppError("User or password invalid!", 400);

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) throw new AppError("User or password invalid!", 403);

  const new_user = instanceToPlain(user);

  const token = jwt.sign(
    {
      id: user.id,
      admin: user.admin,
      user: new_user,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "1h",
      subject: user.id,
    }
  );
  return {
    token,
    admin: user.admin,
    id: user.id,
    user: new_user,
  };
};
