import CommentController from "../controllers/CommentController.mjs";

class CommentError{
    constructor() {
        this.CommentController = new CommentController()
    }

    store(req, res) {
        try {
            return this.CommentController.store(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }


    destroy(req, res) {
        try {
            return this.CommentController.destroy(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }

    show(req, res) {
        try {
            return this.CommentController.show(req, res)
        }catch (e) {
            throw new Error(e)
        }
    }
}


export default new CommentError()