import { Request, Response } from 'express';
import { sendForgotPasswordEmail } from '../../services/user/forgotPassword';
import { resetPassword } from '../../services/user/resetPassword';

export const forgotPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;

  await sendForgotPasswordEmail(email);

  return res.status(200).json({ message: 'Email sent successfully.' });
}

export const resetPasswordController = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  await resetPassword(token, password);

  return res.status(200).json({ message: 'Password reset successfully.' });
}