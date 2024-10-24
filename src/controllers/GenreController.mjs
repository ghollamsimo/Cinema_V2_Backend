import GenreService from "../services/GenreService.mjs";

class GenreController {
    constructor() {
        this.GenreService = new GenreService()
    }

    async store(req, res) {
        const {genre} = req.body
        const client_id = req.user.clientId
        const genres = await this.GenreService.store(client_id, genre)
        return res.json({message: 'Genre stored successfully'});
    }
}

export default GenreController