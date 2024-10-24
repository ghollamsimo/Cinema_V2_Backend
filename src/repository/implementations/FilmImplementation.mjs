import FilmInterface from "../interfaces/FilmInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import Film from "../../schema/FilmSchema.mjs";
import Rating from "../../schema/RatingSchema.mjs";
import FilmModel from "../../models/FilmModel.mjs";
import mongoose from "mongoose";
import MinioService from "../../services/MinioService.mjs";

class FilmImplementation extends FilmInterface{
    constructor(){
        super()
        this.filmDao = new GenericDao(Film);
        this.bucketName = process.env.MINIO_BUCKET_NAME
    }
    index() {
        return this.filmDao.findAll()
            .then(films => {
                return Promise.all(
                    films.map(film => {
                        let imageUrl = null;
                        let videoUrl = null;


                        if (film.image) {
                            return MinioService.getFileUrl(film.image, this.bucketName)
                                .then(url => {
                                   return url;
                                }).then((url) => {
                                    return MinioService.getFileUrl(film.video, this.bucketName)
                                }) .then(videoUrl => {
                                    return {
                                        _id: film._id,
                                        name: film.name,
                                        duration: film.duration,
                                        description: film.description,
                                        genre_id: film.genre_id,
                                        admin_id: film.admin_id,
                                        image: imageUrl || film.image,
                                        video: videoUrl || film.video,
                                    };
                                })
                                .catch(error => {
                                    console.error(`Error getting image URL for film ${film._id}:`, error);
                                    return {
                                        _id: film._id,
                                        name: film.name,
                                        duration: film.duration,
                                        description: film.description,
                                        genre_id: film.genre_id,
                                        admin_id: film.admin_id,
                                        image: film.image,
                                        video: film.video,
                                    };
                                });
                        }
                    })
                );
            })
            .catch(error => {
                console.error("Error in FilmImplementation.index:", error);
                throw new Error(`Error fetching films: ${error.message}`);
            });
    }

    store(filmfields, adminId, _image, _video) {
        const { name, duration, description , genre_id} = filmfields;
        const image = _image;
        const video = _video;
        if (!adminId) {
            throw new Error("adminId is required");
        }
        new FilmModel(name, duration, adminId, description, video);

        const film = {
            name: name,
            duration: parseInt(duration),
            image: image,
            admin_id: adminId,
            description: description,
            genre_id,
            video : video
        };

        return this.filmDao.save(film)
            .then((result) => result)
            .catch((err) => {
                throw new Error(err.message);
            });
    }

    update(_id, filmfields, adminId, _image) {
        const {id} = _id
        const {name, duration, description, genre_id} = filmfields
        const image = _image
        const admin_id = adminId

        if (!admin_id) {
            throw new Error("admin_id is required");
        }

        const film = {
            name,
            duration,
            image,
            admin_id,
            description,
            genre_id
        };

        return this.filmDao.update(id, film).then((result) => {
            return result
        }).catch(error => {
            throw new Error(error)
        })
    }

    destroy(_id) {
        const {id} = _id

        return this.filmDao.delete(id).then((result) => {
            return result;
        }).catch(error => {
            throw new Error(error);
        });
    }

    async show(_id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new Error('Invalid film ID');
            }


            const film = await this.filmDao.schema.findById(_id)
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'client_id',
                        select: 'name'
                    },
                    options: { strictPopulate: false }
                })
                .populate({
                    path: 'genre_id',
                    select: 'genre'
                })
            if (!film) {
                throw new Error('Film not found');
            }


            const ratings = await Rating.find({ film_id: _id })
                .populate({
                    path: 'client_id',
                    select: 'name'
                });


            const userRatings = ratings.map(rating => ({
                clientName: rating.client_id.name,
                rate: rating.rate
            }));

            let imageUrl = null;
            let videoUrl = null;

            try {
                if (film.image) {
                    imageUrl = await MinioService.getFileUrl(film.image, this.bucketName);
                }
            } catch (error) {
                console.error(`Error getting image URL for film ${film._id}:`, error);
            }

            try {
                if (film.video) {
                    videoUrl = await MinioService.getFileUrl(film.video, this.bucketName);
                }
            } catch (error) {
                console.error(`Error getting video URL for film ${film._id}:`, error);
            }

            return {
                ...film.toObject(),
                imageUrl: imageUrl || film.image,
                videoUrl: videoUrl || film.video,
                userRatings: userRatings.length > 0 ? userRatings : 'No ratings yet',
                totalRatings: userRatings.length
            };
        } catch (error) {
            console.error("Error in FilmImplementation.show:", error);
            throw new Error(`Error fetching film: ${error.message}`);
        }
    }



}

export default FilmImplementation
