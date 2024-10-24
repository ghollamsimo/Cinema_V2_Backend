class GenreInterface {
    constructor() {
        if (new.target === GenreInterface) {
            throw new Error('It is an abstract class can not be instancited');
        }

    }

    store(_client_id, _genre){
        throw new Error('Must be Implemented!!');
    }

    destroy(_id){
        throw new Error('Must be Implemented!!');
    }
}

export default GenreInterface