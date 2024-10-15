import FilmController from "../controllers/FilmController.mjs";

class FilmError {
    constructor(){
        this.FilmController = new FilmController()
    }


    update(req, res) {
        try {
            return this.FilmController.update(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }

    destroy(req, res) {
        try {
            return this.FilmController.destroy(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }

    show(req, res) {
        try {
            return this.FilmController.show(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }

    store(req, res) {
        try {
            return this.FilmController.store(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }

    index(req, res) {
        try {
            return this.FilmController.index(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }
}

export default new FilmError()
