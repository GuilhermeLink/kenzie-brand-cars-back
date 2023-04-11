import { AppDataSource } from "../../data-source";
import { User } from "../../entities/entities/user";
import { AppError } from "../../errors/appError";
import { iUserRegister } from "../../interfaces/user";
import { instanceToPlain } from "class-transformer";

export async function createUserService(
  data: iUserRegister
): Promise<iUserRegister> {
  const userRep = AppDataSource.getRepository(User);
  const { email } = data;

  const existingUser = await userRep.findOne({ where: { email } });
  if (existingUser) throw new AppError("Email already exists!", 409);

  const user = userRep.create(data);
  await userRep.save(user);

  const plainUser = instanceToPlain(user) as iUserRegister;
  return plainUser;
}
