import CommentImplementation from "../repository/implementations/CommentImplementation.mjs";

class CommentService {
    constructor() {
        this.CommentImplementation = new CommentImplementation()
    }

    store(_client_id, _comment, _film_id){
        return this.CommentImplementation.store(_client_id, _comment, _film_id)
    }

    update(_id, _comment, _client_id){
        return this.CommentImplementation.update(_id, _comment, _client_id)
    }

    destroy(_id, _client_id){
        return this.CommentImplementation.destroy(_id, _client_id)
    }

    show(_film_id){
        return this.CommentImplementation.show(_film_id)
    }
}

export default CommentService