import SalleService from "../services/SalleService.mjs";

class SalleController {
    constructor() {
        this.SalleService = new SalleService()
    }

    async store(req, res) {
        const {name, type, capacity} = req.body
        const admin_id = req.user?.adminId

        const salle = await this.SalleService.store({name, type, capacity}, admin_id)
        return res.json({message: 'Salle Stored successfully'})
    }

    async index(req, res) {
        const salle = await this.SalleService.index()
        return res.json(salle)
    }

    async destroy(req, res) {
        const {id} = req.params
        const salle = await this.SalleService.destroy(id)

        return res.json({message: 'Salle deleted successfully'})
    }
}

export default SalleController