import mongoose from "mongoose"
import Seats from "./SeatSchema.mjs";

const sessionSchema = new mongoose.Schema({
    film_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
    },
    hours: {
        type: Number,
        enum: [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6 , 7, 8, 9, 10],
        default: 8,
        required: true
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    salle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salle'
    },
    seat_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seats'
    }]
}, { collection: 'sessions' })

const Session = mongoose.model('Session', sessionSchema);

export default Session;