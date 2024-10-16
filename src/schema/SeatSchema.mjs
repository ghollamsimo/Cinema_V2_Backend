import mongoose from "mongoose";

const seatsSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Available', 'Booked'],
        default: 'Available',
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    salle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salle',
        required: true
    },
}, {collection: 'seats'})

const Seats = mongoose.model('Seats', seatsSchema  )

export default Seats