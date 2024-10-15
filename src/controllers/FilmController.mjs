import FilmService from "../services/FilmService.mjs";

class FilmController {
    constructor(){
        this.FilmService = new FilmService()
    }
    async index(req, res) {
        const film = await this.FilmService.index()
        return res.json(film);
    }
    async store(req, res) {
        const { name, duration, description } = req.body;
        const image = req.file ? req.file.path : null;
        const admin_id = req.user._id;

        if (!admin_id) {
            return res.status(400).json({ message: 'Admin ID is required' });
        }

        const filmFields = { name, duration, description };

        await this.FilmService.store(filmFields, admin_id, image);
        return res.status(201).json({ message: 'Film saved successfully' })

    }
    async update(req, res){
        const {id} = req.params
        const {name, duration, description} = req.body
        const image = req.file ? req.file.path : null
        const admin_id = req.user.adminId;

        await this.FilmService.update(id, name, duration, description, image, admin_id)

        return res.json({message: 'Film updated successfully'})

    }

    async destroy(req, res){
        const {id} = req.params
        await this.FilmService.destroy(id)
        return res.json({message: 'Film deleted successfully'})

    }

    async show(req, res){
        const {id} = req.params
        const film = await this.FilmService.show(id)
        return res.json(film)

    }
}

export default FilmController
