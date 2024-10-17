import RatingImplementation from "../repository/implementations/RatingImplementation.mjs";

class RatingService {
    constructor() {
        this.RatingImplementation = new RatingImplementation()
    }

    store(_rate, _film_id, _client_id){
        return this.RatingImplementation.store(_rate, _film_id, _client_id)
    }
}


export default RatingService