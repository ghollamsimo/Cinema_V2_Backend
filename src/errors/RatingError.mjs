import RatingController from "../controllers/RatingController.mjs";

class RatingError {
    constructor() {
        this.RatingController = new RatingController()
    }

    store(req, res){
        try {
            return this.RatingController.store(req, res)
        }catch (err){
            throw new Error(err)
        }
    }
}

export default new RatingError()