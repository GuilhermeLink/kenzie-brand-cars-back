import { iUserToken } from '../../interfaces/userToken';
import { sendForgotPasswordEmail } from './forgotPassword';
import { resetPassword } from './resetPassword';

export async function forgotPassword(email: string): Promise<void> {
  await sendForgotPasswordEmail(email);
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await resetPassword(token, password);
}