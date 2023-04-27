import { Request, Response } from 'express';
import { sendUserResetPass } from '../../services/user/resetpass';


export const resetUserPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body
  const { protocol } = req
  const host = req.get("host")

  await sendUserResetPass(email, protocol, host);

  return res.status(200).json({ message: 'Password reset successfully.' });
}