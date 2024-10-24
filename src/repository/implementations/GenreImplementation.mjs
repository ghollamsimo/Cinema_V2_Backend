import GenreInterface from "../interfaces/GenreInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import Genre from "../../schema/GenreSchema.mjs";
import GenreModel from "../../models/GenreModel.mjs";

class GenreImplementation extends GenreInterface{
    constructor() {
        super();
        this.genreDao = new GenericDao(Genre)
    }

    store(_client_id, _genre) {
        const genreObj = new GenreModel(_genre, _client_id);
        return this.genreDao.save(genreObj).then((result) => {
            return result;
        })
    }
}

export default GenreImplementation