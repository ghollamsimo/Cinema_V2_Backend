import express from "express";
import authenticateJWT from "../middleware/AuthMiddleware.mjs";
import AuthError from "../errors/AuthError.mjs";

export const router = express.Router();

router.post('/auth/register', (req, res) => {
    AuthError.register(req, res);
})

router.post('/auth/login', (req, res) => {
    AuthError.login(req, res);
})