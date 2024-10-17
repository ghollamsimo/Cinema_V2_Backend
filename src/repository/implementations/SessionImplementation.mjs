import SessionInterface from "../interfaces/SessionInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import Session from "../../schema/SessionSchema.mjs";
import SessionModel from "../../models/SessionModel.mjs";
import Seats from "../../schema/SeatSchema.mjs";

class SessionImplementation extends SessionInterface{
    constructor() {
        super();
        this.sessionDao = new GenericDao(Session)
    }

    store(sessionFields, _admin_id) {
        const { film_id, hours, salle_id } = sessionFields;

        Seats.find({ salle_id })
            .then(seats => {
                const seat_ids = seats.map(seat => seat._id);

                const sessionObj = new SessionModel(film_id, hours, salle_id, _admin_id, seat_ids);

                return this.sessionDao.save(sessionObj);
            })
            .then(savedSession => {
                return savedSession;
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
