import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({

    session_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    seat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seats',
        required: true
    }
}, {collection: 'reservations'})

const Reservation = mongoose.model('Reservation', reservationSchema)

export default Reservation