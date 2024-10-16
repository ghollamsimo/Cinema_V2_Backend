import mongoose from "mongoose";

const salleShema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Normal', 'Vip'],
        default: 'Normal',
    },
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
}, {collection: 'salles'})

const Salle = mongoose.model('Salle', salleShema)

export default Salle