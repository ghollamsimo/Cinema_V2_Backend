import CommentInterface from "../interfaces/CommentInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import Comment from "../../schema/CommentsSchema.mjs";
import Film from "../../schema/FilmSchema.mjs";

class CommentImplementation extends CommentInterface{
    constructor() {
        super();
        this.commentDao = new GenericDao(Comment)
        this.filmDao = new GenericDao(Film)
    }


    store(_client_id, _comment, _film_id) {
        const { comment } = _comment;
        const film_id = _film_id;
        const comments = {
            film_id: film_id,
            client_id: _client_id,
            comment: comment
        };

        return this.commentDao.save(comments)
            .then((savedComment) => {

                return this.filmDao.update(
                    film_id,
                    { $addToSet: { comments: savedComment._id } },
                    { new: true }
                ).then(() => savedComment);
            });
    }


    destroy(_id, _client_id) {
        const {id} = _id
        return this.commentDao.deleteByClientId(id, _client_id).then((result) => {
            return result
        })
    }

    show(_film_id) {
        return this.commentDao.findByFilmId(_film_id)
    }
}

export default CommentImplementation