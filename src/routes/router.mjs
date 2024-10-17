import express from "express";
import AuthError from "../errors/AuthError.mjs";
import FilmError from "../errors/FilmError.mjs";
import authMiddleware from "../middleware/AuthMiddleware.mjs";
import upload from "../config/UploadConfig.mjs";
import CommentError from "../errors/CommentError.mjs";
import SalleError from "../errors/SalleError.mjs";
import SessionError from "../errors/SessionError.mjs";

export const router = express.Router();

router.post('/auth/register', (req, res) => {
    AuthError.register(req, res);
})

router.post('/auth/login', (req, res) => {
    AuthError.login(req, res);
})

// Film

router.get('/films/index', (req, res) => {
    FilmError.index(req, res);
})
router.post('/films/store', authMiddleware, upload.single('image'), (req, res) => {
    FilmError.store(req, res);
})

router.put('/films/update/:id', (req, res) => {
    FilmError.update(req, res);
})

router.delete('/films/delete/:id', (req, res) => {
    FilmError.destroy(req, res);
})

router.get('/films/show/:id', (req, res) => {
    FilmError.show(req, res);
})

// Comments

router.post('/comment/store/:film_id', authMiddleware,(req, res) => {
    CommentError.store(req, res)
})



// Salle

router.post('/salle/store', authMiddleware, (req, res) => {
    SalleError.store(req, res)
})

router.get('/salle/index', (req, res) => {
    SalleError.index(req, res)
})

router.delete('/salle/delete/:id', (req, res) => {
    SalleError.destroy(req, res)
})

// Session

router.post('/session/store', authMiddleware, (req, res) => {
    SessionError.store(req, res)
})