import { AppDataSource } from "../../data-source";
import { User } from "../../entities/entities/user";
import { AppError } from "../../errors/appError";
import { iUserRequest } from "../../interfaces/user";
import { instanceToPlain } from "class-transformer";
import {randomUUID} from "node:crypto"
import { emailService } from "../../utils/sendEmail";

export const sendUserResetPass = async (email: string, protocol: string, host: string) => {
  const userRep = AppDataSource.getRepository(User);

  const user = await userRep.findOne({
      where: {email}
  })

  if(!user){
      throw new AppError("User Not Found!", 404)  
  }

  const resetToken = randomUUID()

  await userRep.update({ where: {email}, data: {reset_token: resetToken} })

  const resetPassword = emailService.resetPassword(email, user.name, protocol, host, resetToken)

  await emailService.sendEmail(resetPassword)
};