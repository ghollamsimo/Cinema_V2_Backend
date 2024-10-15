class CommentModel {
    constructor(client_id, comment, film_id) {
        this.client_id = client_id
        this.comment = comment
        this.film_id = film_id
    }

    getComment(){
        return this.comment
    }

    getFilmId(){
        return this.film_id
    }

    getClientId(){
        return this.client_id
    }
}

export default CommentModel