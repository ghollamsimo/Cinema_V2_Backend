import SessionInterface from "../interfaces/SessionInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import Session from "../../schema/SessionSchema.mjs";
import SessionModel from "../../models/SessionModel.mjs";
import Seats from "../../schema/SeatSchema.mjs";
import Reservation from "../../schema/ReservationSchema.mjs";

class SessionImplementation extends SessionInterface{
    constructor() {
        super();
        this.sessionDao = new GenericDao(Session);
        this.reservationDao = new GenericDao(Reservation);
        this.seatsDao = new GenericDao(Seats);
    }

    store(sessionFields, _admin_id) {
        const { film_id, hours, salle_id, started_date, end_date } = sessionFields;

        return Seats.find({ salle_id })
            .then(seats => {
                const seat_ids = seats.map(seat => seat._id);
                const sessionObj = new SessionModel(film_id, hours, salle_id, _admin_id, seat_ids, started_date, end_date);

                return this.sessionDao.save(sessionObj);
            })
            .then(savedSession => {
                this.scheduleSessionExpiration(savedSession);
                return savedSession;
            });
    }

    scheduleSessionExpiration(session) {
        const now = new Date();
        const endDate = new Date(session.end_date);
        const timeUntilExpiration = endDate - now;

        if (timeUntilExpiration > 0) {
            setTimeout(() => {
                this.updateExpiredSession(session._id);
            }, timeUntilExpiration);
        }
    }
    updateExpiredSession(sessionId) {
        this.sessionDao.update(sessionId, { status: 'Completed' })
            .then(() => {
                return this.reservationDao.deleteMany({ session_id: sessionId });
            })
            .then(() => {
                return this.sessionDao.findById(sessionId);
            })
            .then(session => {
                return this.sessionDao.updateMany({ _id: { $in: session.seat_id } }, { status: 'Available' });
            })
    }
    destroy(_id) {
        const {id} = _id

        return this.sessionDao.delete(id).then((result) => {
            return result
        })
    }
}

export default SessionImplementation
