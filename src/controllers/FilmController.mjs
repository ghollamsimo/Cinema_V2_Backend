import FilmService from "../services/FilmService.mjs";
import MinioService from "../services/MinioService.mjs";

class FilmController {
    constructor(){
        this.FilmService = new FilmService()
        this.Minio = new MinioService()
    }
    async index(req, res) {
        const film = await this.FilmService.index()
        return res.json(film);
    }
    async store(req, res) {
        const { name, duration, description, genre_id } = req.body;
        const imageFile = req.files?.image?.[0];
        const videoFile = req.files?.video?.[0]; // Access video file from req.files
        const admin_id = req.user?.adminId;

        if (!admin_id) {
            return res.status(400).json({ message: 'Admin ID is required' });
        }

        // Upload image and video to Minio
        let imageUrl = null;
        let videoUrl = null;

        if (imageFile) {
            imageUrl = await this.Minio.uploadFile(imageFile, 'movie'); // Upload image to the image bucket
        }

        if (videoFile) {
            videoUrl = await this.Minio.uploadFile(videoFile, 'movie'); // Upload video to the video bucket
        }

        const filmFields = { name, duration, description, genre_id };
        await this.FilmService.store(filmFields, admin_id, imageUrl, videoUrl);

        return res.status(201).json({ message: 'Film saved successfully' });
    }
    async update(req, res){
        const {id} = req.params
        const {name, duration, description} = req.body
        const image = req.file ? req.file.path : null
        console.log(image)
        const admin_id = req.user.adminId;

        await this.FilmService.update(id, name, duration, description, image, admin_id)

        return res.json({message: 'Film updated successfully'})

    }

    async destroy(req, res){
        const {id} = req.params
        await this.FilmService.destroy(id)
        return res.json({message: 'Film deleted successfully'})

    }

    async show(req, res){
        const {id} = req.params
        const film = await this.FilmService.show(id)
        return res.json(film)

    }
}

export default FilmController
