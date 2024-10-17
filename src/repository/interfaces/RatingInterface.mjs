class RatingInterface{
    constructor() {
        if(new.target === RatingInterface){
            throw new Error('It is an abstract class can not be instancited');
        }
    }

    store(_rate, _film_id, _client_id){
        throw new Error('Must be Implemented!!');
    }
}

export default RatingInterface