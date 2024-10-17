import SessionService from "../services/SessionService.mjs";

class SessionController {
    constructor() {
        this.SessionService = new SessionService()
    }

    async store(req, res) {
        const {film_id, hours, salle_id } = req.body
        const admin_id = req.user?.adminId

        const session = await this.SessionService.store({film_id, hours, salle_id }, admin_id)
        return res.json({message: 'Session stored successfully'})
    }
}

export default SessionController