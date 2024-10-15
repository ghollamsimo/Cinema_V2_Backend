import FilmService from "../services/FilmService.mjs";

class FilmController {
    constructor(){
        this.FilmService = new FilmService()
    }
    async index(req, res) {
        const film = await this.FilmService.index()
        return res.json(film)
    }
    async store(req, res) {
        const {name, duration, description, price} = req.body
        const image = req.file ? req.file.path : null
        const adminId = req.user.adminId;

        await this.FilmService.store(name, duration, description, price, image, adminId)
        return res.json({message: 'Film saved successfully'})

    }

    async update(req, res){

        const {id} = req.params
        const {name, duration, description, price} = req.body
        const image = req.file ? req.file.path : null
        const adminId = req.user.adminId;

        await this.FilmService.update(id, name, duration, description, price, image, adminId)

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
