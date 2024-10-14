import express from "express";
import {router} from "./routes/routes.mjs";
import dotenv from "dotenv";
import db from "./config/SettingsConfig.mjs";
dotenv.config()
class Server{
    constructor(port = process.env.APP_PORT || 8080){
        this.port = port;
        this.app = express();
        this.config();
        this.routing();
    }

    config(){
        this.app.use((req,res,next)=> {
            next();
        })
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json())
    }

    routing(){
        this.app.use('/', router);
    }

    start(){
        this.app.listen(this.port)
    }

}

new Server().start()