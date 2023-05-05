import { hashSync } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/entities/user";
import { AppError } from "../../errors/appError";

export const userResetPass = async (password: string, resetToken: string) => {
  const userRep = AppDataSource.getRepository(User);

  const user = await userRep.findOne({
    where: {reset_token: resetToken}
  })

  if(!user){
      throw new AppError("User not found", 404)
  }

  await userRep.update(
    user.id,
    { password: hashSync(password, 10), reset_token: null }
  )
};