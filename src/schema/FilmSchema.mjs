import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    genre_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true,
    }],
    image: {
        type: String,
        required: true,
    },
    video: { type: String, required: true },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { collection: 'films' });

const Film = mongoose.model('Film', filmSchema);

export default Film;
