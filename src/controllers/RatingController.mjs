import RatingService from "../services/RatingService.mjs";

class RatingController {
    constructor() {
        this.RatingService = new RatingService()
    }

    async store(req, res){
        const {rate} = req.body
        const {film_id} = req.params
        const client_id = req.user.clientId

        const rating = await this.RatingService.store(rate, film_id, client_id)
        return res.json(rating);
    }
}

export default RatingController