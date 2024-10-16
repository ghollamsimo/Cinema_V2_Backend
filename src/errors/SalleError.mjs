import SalleController from "../controllers/SalleController.mjs";

class SalleError {
    constructor() {
        this.SalleController = new SalleController()
    }

    store(req, res) {
        try {
            return this.SalleController.store(req, res)
        }catch (err) {
            throw new Error(err)
        }
    }

    index(req, res) {
        try {
            return this.SalleController.index(req, res)
        }catch (err) {
            throw new Error(err)
        }
    }

    destroy(req, res) {
        try {
            return this.SalleController.destroy(req, res)
        }catch (err) {
            throw new Error(err)
        }
    }
}

export default new SalleError()