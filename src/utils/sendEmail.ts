import Mailgen from "mailgen";
import { AppError } from "../errors/appError";
import { iSendEmailRequest } from "../interfaces/user";
import {createTransport} from "nodemailer"

class SendEmailService {
    async sendEmail({to, subject, text}: iSendEmailRequest){
        const transporter = createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        await transporter.sendMail({
            from: "virardicamila@gmail.com",
            to,
            subject,
            html: text
        }).then(() => {
            console.log("Email Sended With Sucess!")
        }).catch((error) => {
            console.log(error)
            throw new AppError("Email not sended, try again later!", 500)
        })
    }

    resetPassword(userMail: string, userName: string, protocol: string, host: string, resetToken:string){
        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {               
                name: 'Kenzie Brand Cars',
                link: `${protocol}://${host}`                
            }
        });

        const email = {
            body: {
                name: userName,
                intro: 'You have received this email because a password reset request for your account was received.',
                action: {
                    instructions: 'Click the button below to reset your password:',
                    button: {
                        color: '#DC4D2F',
                        text: 'Reset your password',
                        link: `${protocol}:${host}/reset_password/${resetToken}`
                    }
                },
                outro: 'If you did not request a password reset, no further action is required on your part.'
            }
        };

        const emailBody = mailGenerator.generate(email)

        const emailTemplate = {
            to: userMail,
            subject: "Reset password",
            text: emailBody
        }

        return emailTemplate
    }
}

const emailService = new SendEmailService()

export {emailService}