import express from "express";
import AuthError from "../errors/AuthError.mjs";
import FilmError from "../errors/FilmError.mjs";
import authMiddleware from "../middleware/AuthMiddleware.mjs";
import CommentError from "../errors/CommentError.mjs";
import SalleError from "../errors/SalleError.mjs";
import SessionError from "../errors/SessionError.mjs";
import ReservationError from "../errors/ReservationError.mjs";
import RatingError from "../errors/RatingError.mjs";
import GenreError from "../errors/GenreError.mjs";
import multer from "multer";

export const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.fieldname === "image") {
            if (!file.mimetype.startsWith("image/")) {
                return cb(new Error("Only image files are allowed!"), false);
            }
        } else if (file.fieldname === "video") {
            if (!file.mimetype.startsWith("video/")) {
                return cb(new Error("Only video files are allowed!"), false);
            }
        }
        cb(null, true);
    }
});

router.post('/auth/register', (req, res) => {
    AuthError.register(req, res)
})

router.post('/auth/login', (req, res) => {
    AuthError.login(req, res);
})

router.get('/auth/show/:id', (req, res) => {
    AuthError.show(req, res)
})
// Film

router.get('/films/index', (req, res) => {
    FilmError.index(req, res);
})
router.post('/films/store', authMiddleware, upload.fields([{ name: 'image' }, { name: 'video' }]), (req, res) => {
    FilmError.store(req, res)
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
    SalleError.store(req, res);
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

router.delete('/session/delete/:id', (req, res) => {
    SessionError.destroy(req, res)
})

router.get('/session/show/:film_id', (req, res) => {
    SessionError.show(req, res)
})
// Reservation

router.post('/reservation/store/:session_id', authMiddleware, (req, res) => {
    ReservationError.store(req, res)
})

// Rating

router.post('/rating/store/:film_id', authMiddleware, (req, res) => {
    RatingError.store(req, res)
})

// Genre

router.post('/genre/store/:film_id', authMiddleware, (req, res) => {
    GenreError.store(req, res);
})