import express from "express";
import { router } from "./routes/router.mjs";
import dotenv from "dotenv";
import db from "./config/SettingsConfig.mjs";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "node:url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsPath = path.join(__dirname, '../uploads');
class Server {
    constructor(port = process.env.APP_PORT || 3000) {
        this.port = port;
        this.app = express();
        this.config();
        this.routing();
    }

    config() {
        this.app.use((req, res, next) => {
            next();
        });
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors({
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        this.app.use('/uploads', express.static(uploadsPath));
    }

    routing() {
        this.app.use('/', router);
    }

    start() {
        this.app.listen(this.port);
    }
}

new Server().start();
