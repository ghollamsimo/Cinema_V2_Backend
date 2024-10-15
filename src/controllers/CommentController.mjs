import CommentService from "../services/CommentService.mjs";

class CommentController{
    constructor() {
        this.CommentService = new CommentService()
    }

    async store(req, res){
        const {comment} = req.body
        const {film_id} = req.params
        const client_id = req.user.clientId

        const comments = await this.CommentService.store(client_id, comment, film_id)
        return res.json({message: 'Comment stored Successfully'})
    }

    async update(req, res){
        const {id} = req.params
        const {comment} = req.body
        const client_id = req.user.clientId

        const comments = await this.CommentService.update(id, comment, client_id )
        return res.json({message: 'Comment updated Successfully'})
    }

    async destroy(req, res){
        const {id} = req.params
        const client_id = req.user.clientId

        const comments = await this.CommentService.destroy(id, client_id )
        return res.json({message: 'Comment deleted Successfully'})
    }

    async show(req, res){
        const {id} = req.params
        const film_id = req.params

        const comment = await this.CommentService.show(id, film_id )
        return res.json(comment)
    }
 }

 export default CommentController