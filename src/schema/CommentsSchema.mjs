import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
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
}, { collection: 'comments' });

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment