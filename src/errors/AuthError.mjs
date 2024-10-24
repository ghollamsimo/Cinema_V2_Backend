import AuthController from "../controllers/AuthController.mjs";

class AuthError {
    constructor() {
        this.AuthController = new AuthController()
    }

    register(req, res) {
        try {
            return this.AuthController.register(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }

    login(req, res) {
        try {
            return this.AuthController.login(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }

    show(req, res) {
        try {
            return this.AuthController.show(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }
}

export default new AuthError()