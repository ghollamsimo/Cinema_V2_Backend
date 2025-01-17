import ReservationService from "../services/ReservationService.mjs";

class ReservationController {
    constructor() {
        this.ReservationService = new ReservationService()
    }

    async store(req, res){
        const { seat_id } = req.body
        const {session_id} = req.params
        const client_id = req.user.clientId
        const reservation = await this.ReservationService.store({seat_id}, session_id,client_id)

        return res.json({message: 'Reservation stored Successfully'})
    }
}

export default ReservationController