import ReservationInterface from "../interfaces/ReservationInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import Reservation from "../../schema/ReservationSchema.mjs";
import ReservationModel from "../../models/ReservationModel.mjs";
import Seats from "../../schema/SeatSchema.mjs";

class ReservationImplementation extends ReservationInterface{
    constructor() {
        super();
        this.reservationDao = new GenericDao(Reservation)
        this.seatsDao = new GenericDao(Seats)
    }

    store(reservationFields, _session_id,_client_id) {
        const {seat_id} = reservationFields
        const reservationObj = new ReservationModel(_session_id, seat_id, _client_id)
        const reservation = {
            session_id: reservationObj.getSessionId(),
            seat_id: reservationObj.getSeatId(),
            client_id: _client_id
        }
        return this.reservationDao.save(reservation)
            .then((result) => {
                const seatUpdateData = { status: 'Booked' };
                return this.seatsDao.update(seat_id, seatUpdateData)
                    .then(() => result);
            })

    }
}

export default ReservationImplementation