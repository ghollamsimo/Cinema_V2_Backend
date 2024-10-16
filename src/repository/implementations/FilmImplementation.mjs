import FilmInterface from "../interfaces/FilmInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import Film from "../../schema/FilmSchema.mjs";
import FilmModel from "../../models/FilmModel.mjs";

class FilmImplementation extends FilmInterface{
    constructor(){
        super()
        this.filmDao = new GenericDao(Film);
    }
    index() {
        return this.filmDao.findAll().then((result) => {
            return result
        })
    }

    store(filmfields, adminId, _image) {
        const { name, duration, description } = filmfields;
        const image = _image;
        if (!adminId) {
            throw new Error("adminId is required");
        }

        new FilmModel(name, duration, adminId, description);
        const film = {
            name: name,
            duration: parseInt(duration),
            image: image,
            admin_id: adminId,
            description: description,
        };

        return this.filmDao.save(film)
            .then((result) => result)
            .catch((err) => {
                throw new Error(err.message);
            });
    }

    update(_id, filmfields, adminId, _image) {
        const {id} = _id
        const {name, duration, description} = filmfields
        const image = _image
        const admin_id = adminId;
        if (!admin_id) {
            throw new Error("admin_id is required");
        }

        const film = {
            name,
            duration,
            image,
            admin_id,
            description,
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
            return result
        }).catch(error => {
            throw new Error(error)
        })
    }

    show(_id) {
        const {id} = _id

        return this.filmDao.findById(id).then((result) => {
            return result
        }).catch(error => {
            throw new Error(error)
        })
    }
}

export default FilmImplementation
