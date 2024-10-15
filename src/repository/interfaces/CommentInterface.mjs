class CommentInterface {
    constructor(){
        if(new.target === CommentInterface){
            throw new Error('It is an abstract class can not be instancited');
        }
    }

    store(_client_id, _comment, _film_id){
        throw new Error('Must be Implemented!!');
    }

    update(_id, _comment, _client_id){
        throw new Error('Must be Implemented!!');
    }

    show(_film_id){
        throw new Error('Must be Implemented!!');
    }

    destroy(_id, _client_id){
        throw new Error('Must be Implemented!!');
    }
}

export default CommentInterface