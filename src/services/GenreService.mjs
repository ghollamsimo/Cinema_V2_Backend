import GenreImplementation from "../repository/implementations/GenreImplementation.mjs";

class GenreService{
    constructor() {
        this.GenreImplementation = new GenreImplementation();
    }

    store(_client_id, _genre){
        return this.GenreImplementation.store(_client_id, _genre);
    }
}

export default GenreService