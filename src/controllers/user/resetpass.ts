import { Request, Response } from 'express';
import { userResetPass } from '../../services/user/resetpass';

export const resetUserPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body
  const { token } = req.params

  await userResetPass(password, token)

  return res.status(200).json({ message: 'Password changed sucessfully.' });
};