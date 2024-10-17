import mongoose from "mongoose";

const salleSchema = new mongoose.Schema({
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
        ref: 'User',
        required: true
    },
}, {collection: 'salles'})

const Salle = mongoose.model('Salle', salleSchema)

export default Salle