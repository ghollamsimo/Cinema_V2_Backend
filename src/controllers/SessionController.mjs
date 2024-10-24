import SessionService from "../services/SessionService.mjs";

class SessionController {
    constructor() {
        this.SessionService = new SessionService()
    }

    async store(req, res) {
        const {film_id, hours, salle_id, started_date, end_date, status} = req.body
        const admin_id = req.user?.adminId
        const session = await this.SessionService.store({film_id, hours, salle_id, started_date, end_date, status}, admin_id)
        return res.json({message: 'Session stored successfully'})
    }

    async destroy(req, res) {
        const {id} = req.params
        const session = await this.SessionService.destroy(id)
        return res.json({message: 'Session destroyed successfully'})
    }

    async show(req, res) {
        const {film_id} = req.params
        const session = await this.SessionService.show(film_id)
        return res.json(session);
    }
}

export default SessionController