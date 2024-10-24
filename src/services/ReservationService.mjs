import ReservationImplementation from "../repository/implementations/ReservationImplementation.mjs";

class ReservationService {
    constructor() {
        this.ReservationImplementation = new ReservationImplementation()
    }

    store(reservationField, session_id, _client_id){
        return this.ReservationImplementation.store(reservationField, session_id,_client_id)
    }
}

export default ReservationService