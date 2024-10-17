import SessionController from "../controllers/SessionController.mjs";

class SessionError {
    constructor() {
        this.SessionController = new SessionController()
    }

    store(req, res) {
        try {
            return this.SessionController.store(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }
}

export default new SessionError()