import CommentImplementation from "../repository/implementations/CommentImplementation.mjs";

class CommentService {
    constructor() {
        this.CommentImplementation = new CommentImplementation()
    }

    store(client_id, commentObj, film_id) {
        return this.CommentImplementation.store(client_id, commentObj, film_id);
    }

    destroy(_id, _client_id){
        return this.CommentImplementation.destroy(_id, _client_id)
    }

    show(_film_id){
        return this.CommentImplementation.show(_film_id)
    }
}

export default CommentService