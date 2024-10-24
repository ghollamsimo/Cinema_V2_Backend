import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: true,
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { collection: 'genre' });

const Genre = mongoose.model('Genre', GenreSchema);

export default Genre;
