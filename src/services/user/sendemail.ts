import { AppDataSource } from "../../data-source";
import { User } from "../../entities/entities/user";
import { AppError } from "../../errors/appError";
import {randomUUID} from "node:crypto"
import { emailService } from "../../utils/sendEmail";
import validator from 'email-validator';

export const sendMailResetPass = async (email: string, protocol: string, host: string) => {
  const userRep = AppDataSource.getRepository(User);

  if (!validator.validate(email)) {
    throw new AppError("Endereço de e-mail inválido", 400);
  }

  const user = await userRep.findOne({
      where: {email}
  })

  if(!user){
      throw new AppError("User Not Found!", 404)  
  }

  const resetToken = randomUUID()

  await userRep.update(
    { email },
    { reset_token: resetToken }
  );

  const resetPassword = emailService.resetPassword(email, user.name, protocol, host, resetToken)

  await emailService.sendEmail(resetPassword)
};