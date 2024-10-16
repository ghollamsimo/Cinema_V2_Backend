import CommentInterface from "../interfaces/CommentInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import Comment from "../../schema/CommentsSchema.mjs";
import CommentModel from "../../models/CommentModel.mjs";

class CommentImplementation extends CommentInterface{
    constructor() {
        super();
        this.commentDao = new GenericDao(Comment)
    }

    store(_client_id, _comment, _film_id) {
        const {comment} = _comment
        const film_id = _film_id
        const client_id = _client_id

        new CommentModel(client_id, comment, film_id)
        const comments = {
            film_id: film_id,
            client_id: client_id,
            comment: comment
        }

        return this.commentDao.save(comments).then((result) => {
            return result
        })
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