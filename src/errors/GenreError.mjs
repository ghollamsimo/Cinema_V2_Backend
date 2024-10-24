import GenreController from "../controllers/GenreController.mjs";

class GenreError {
    constructor() {
        this.GenreController = new GenreController()
    }

    store(req, res) {
        try {
            return this.GenreController.store(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }

}

export default new GenreError()