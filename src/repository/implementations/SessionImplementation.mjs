import SessionInterface from "../interfaces/SessionInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import Session from "../../schema/SessionSchema.mjs";
import SessionModel from "../../models/SessionModel.mjs";
import Seats from "../../schema/SeatSchema.mjs";
import Reservation from "../../schema/ReservationSchema.mjs";
import mongoose from "mongoose";

class SessionImplementation extends SessionInterface {
    constructor() {
        super();
        this.sessionDao = new GenericDao(Session);
        this.reservationDao = new GenericDao(Reservation);
        this.seatsDao = new GenericDao(Seats)
    }

    async store(sessionFields, _admin_id) {
        const { film_id, hours, salle_id, started_date, end_date, status } = sessionFields;

        try {

            const seats = await Seats.find({ salle_id });


            const seat_ids = seats.map(seat => new mongoose.Types.ObjectId(seat._id));

            const sessionObj = new SessionModel(film_id, hours, salle_id, _admin_id, seat_ids, started_date, end_date, status);

            const session = {
                film_id: film_id,
                hours,
                salle_id,
                _admin_id,
                seat_id: seat_ids,
                started_date,
                end_date,
                status
            };


            const savedSession = await this.sessionDao.save(session);


            this.scheduleSessionExpiration(savedSession);

            return savedSession;
        } catch (error) {
            console.error("Error storing session:", error);
            throw error;
        }
    }

    scheduleSessionExpiration(session) {
        const now = new Date();
        const endDate = new Date(session.end_date);
        const timeUntilExpiration = endDate - now;

        if (timeUntilExpiration > 0) {
            setTimeout(() => {
                this.updateExpiredSession(session._id).then(r => {
                    return r
                });
            }, timeUntilExpiration);
        }
    }

    async updateExpiredSession(sessionId) {
        try {
            await this.sessionDao.update(sessionId, { status: 'Completed' });
            const session = await this.sessionDao.findById(sessionId);

            const seatIds = session.seat_id.map(id => new mongoose.Types.ObjectId(id));

            const result = await Seats.updateMany(
                { _id: { $in: seatIds } },
                { $set: { status: 'Available' } }
            );

        } catch (error) {
            console.error("Error updating session or seats:", error);
        }
    }


    destroy(_id) {
        const {id} = _id

        return this.sessionDao.delete(id).then((result) => {
            return result
        })
    }

    async show(_film_id) {
        const sessions = await Session.find({film_id: _film_id})
            .populate('seat_id');

        return sessions.map(s => {
            return {
                ...s.toObject(),
                seat_id: s.seat_id ? s.seat_id.map(seat => ({
                    seat_id: seat._id,
                    status: seat.status
                })) : []
            };
        });
    }


}

export default SessionImplementation
