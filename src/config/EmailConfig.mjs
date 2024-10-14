import nodemailer from 'nodemailer';
import 'dotenv/config';
import dotenv from "dotenv";
dotenv.config()
export class EmailConfig {
    static transporter;

    constructor(user) {
        this.user = user;

        if (!EmailConfig.transporter) {
            EmailConfig.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.APP_EMAIL,
                    pass: process.env.APP_EMAIL_PASS,
                },
            });
        }
    }

    async sendEmail({ to, subject, text, html }) {
        const mailOptions = {
            from: '"NAME_YOUR_APP" <no-reply@NAME_YOUR_APP.com>',
            to,
            subject,
            text,
            html,
        };

        try {
            const info = await EmailConfig.transporter.sendMail(mailOptions);
            console.log("Message envoyé : %s", info.messageId);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email : ", error);
            throw error;
        }
    }


}