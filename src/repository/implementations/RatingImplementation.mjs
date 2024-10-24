import RatingInterface from "../interfaces/RatingInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import Rating from "../../schema/RatingSchema.mjs";
import RatingModel from "../../models/RatingModel.mjs";

class RatingImplementation extends RatingInterface{
    constructor() {
        super();
        this.rateDao = new GenericDao(Rating)
    }

    store(_rate, _film_id, _client_id) {
        const rates = new RatingModel(_rate, _film_id, _client_id);

        return this.rateDao.save(rates).then((result) => {

                return this.calculateAverageForFilm(_film_id).then((average) => {
                return { savedRating: result, averageRating: average };
            });
        });
    }

    calculateAverageForFilm(_film_id) {
        return this.rateDao.find({ film_id: _film_id, rate: { $gte: 1, $lte: 5 } })
            .then((ratings) => {
                if (ratings.length === 0) return 0;

                const total = ratings.reduce((sum, rating) => sum + rating.rate, 0);
                return total / ratings.length;
            });
    }

}


export default RatingImplementation