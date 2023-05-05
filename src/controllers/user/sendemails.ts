import { Request, Response } from 'express';
import { sendMailResetPass } from '../../services/user/sendemail';

export const sendResetEmailController = async (req: Request, res: Response) => {
  const { email } = req.body
  const { protocol } = req
  const host = req.get("host")

  await sendMailResetPass(email, protocol, host);

  return res.status(200).json({ message: 'Token sended to your email.' });
};