import AuthInterface from "../interfaces/AuthInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import User from "../../schema/UserSchema.mjs";
import UserModel from "../../models/UserModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EmailConfig } from "../../config/EmailConfig.mjs";

class AuthImplementation extends AuthInterface {
    constructor() {
        super();
        this.userDao = new GenericDao(User);
    }

    register(userfields) {
        const { name, email, password, role } = userfields;
        const userObj = new UserModel(name, email, password, role);
        return bcrypt.hash(userObj.getPassword(), 10).then((hashedPassword) => {
            const user = {
                name: userObj.getName(),
                email: userObj.getEmail(),
                password: hashedPassword,
                role: userObj.getRole()
            };

            return this.userDao.save(user).then((response) => {
                return response;
            }).catch((err) => {
                throw new Error(err);
            });
        }).catch((err) => {
            throw new Error('Error hashing password: ' + err);
        });
    }

    login(email, password) {
        return this.userDao.findByUserEmail(email).then((user) => {
            if (!user) {
                throw new Error('User not found');
            }

            return bcrypt.compare(password, user.password).then((isMatch) => {
                if (!isMatch) {
                    throw new Error('Invalid password');
                }

                let adminId = null;
                if (user.role.includes('Admin')) {
                    adminId = user._id;
                }

                let clientId = null;
                if (user.role.includes('Client')) {
                    clientId = user._id;
                }

                const token = jwt.sign(
                    { _id: user._id, roles: user.role, adminId, clientId },
                    process.env.APP_JWT,
                    { expiresIn: "1h" }
                );

                return { user, token };
            }).catch((err) => {
                throw new Error('Error comparing password: ' + err);
            });
        }).catch((err) => {
            throw new Error('Error finding user: ' + err);
        });
    }

    forgot(userfield) {
        const { email } = userfield;

        return this.userDao.findByUserEmail(email).then((user) => {
            if (!user) {
                throw new Error('User not found');
            }

            const resetToken = jwt.sign(
                { email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const emailSender = new EmailConfig(user.email);
            const resetLink = `http://localhost:8080/reset-password?token=${resetToken}`;

            return emailSender.sendEmail({
                to: user.email,
                subject: 'Password Reset',
                text: 'Click on the link to reset your password.',
                html: `<b>Click <a href="${resetLink}">here</a> to reset your password.</b>`
            }).then((response) => {
                return response;
            }).catch((err) => {
                throw new Error('Error sending email: ' + err);
            });
        }).catch((err) => {
            throw new Error('Error finding user: ' + err);
        });
    }
}

export default AuthImplementation;
