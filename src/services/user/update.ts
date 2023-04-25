import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/entities/user";
import { iUserToken } from "../../interfaces/announce";
import { iUserUpdateRequest } from "../../interfaces/user";
import { Address } from "../../entities/entities/address";
import { hashSync } from "bcryptjs";

export const updateUserService = async (
  uuid: string,
  body: iUserUpdateRequest,
  token: iUserToken
) => {
  const userRep = AppDataSource.getRepository(User);
  const exist = await userRep.findOne({
    where: { id: uuid },
    relations: ["address"],
  });
  if (!exist) throw new Error("User not found");

  if (token.user.id !== exist.id && !token.user.admin)
    throw new Error("Unauthorized");

  const password = hashSync(body.password, 10);

  if (body.password) {
    body.password = password;
  }

  const { address, ...updateData } = body;
  const user = userRep.merge(exist, updateData);

  if (address) {
    const addressRep = AppDataSource.getRepository(Address);
    const existAddress = await addressRep.findOne({
      where: { id: exist.address.id },
    });
    const address = addressRep.merge(existAddress, body.address);
    user.address = address;
  }
  await userRep.save(user);
  return instanceToPlain(user);
};
