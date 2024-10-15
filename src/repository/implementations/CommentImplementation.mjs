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
        const {film_id} = _film_id
        const client_id = _client_id

        const commentObj = new CommentModel(client_id, comment, film_id)
        const comments = {
            comment: commentObj.getComment(),
            film_id: commentObj.getFilmId(),
            client_id
        }

        return this.commentDao.save(comments).then((result) => {
            return result
        })
    }

    update(_id, _comment, _film_id, _client_id) {
        const {id} = _id
        const {comment} = _comment
        const client_id = _client_id

        const comments = {
            comment,
            client_id
        }

        return this.commentDao.update(id, comments).then((result) => {
            return result
        })
    }

    destroy(_id, _client_id) {
        const {id} = _id
        const client_id = _client_id

        return this.commentDao.deleteByClientId(id, client_id).then((result) => {
            return result
        })
    }

    show(_film_id) {
        const film_id = _film_id
        return this.commentDao.findByFilmId(film_id)
    }
}

export default CommentImplementation