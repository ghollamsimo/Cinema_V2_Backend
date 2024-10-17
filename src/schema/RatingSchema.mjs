import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    rate: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
    },
    film_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true,
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { collection: 'rates' });

const Rating = mongoose.model('Rating', RatingSchema);

export default Rating;
