import ReservationService from "../services/ReservationService.mjs";

class ReservationController {
    constructor() {
        this.ReservationService = new ReservationService()
    }

    async store(req, res){
        const {session_id, seat_id} = req.body
        const client_id = req.user.clientId
        const reservation = await this.ReservationService.store({session_id, seat_id}, client_id)

        return res.json({message: 'Reservation stored Successfully'})
    }
}

export default ReservationController