class RatingModel {
    constructor(rate, film_id, client_id) {
        this.rate = rate;
        this.film_id = film_id;
        this.client_id = client_id;
    }

    getRate(){
        return this.rate;
    }

    getFilmId(){
        return this.film_id;
    }

    getClientId(){
        return this.client_id;
    }
}

export default RatingModel