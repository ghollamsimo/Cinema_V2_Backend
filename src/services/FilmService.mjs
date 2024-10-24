import FilmImplementation from "../repository/implementations/FilmImplementation.mjs";

class FilmService {
    constructor() {
        this.FilmImplementation = new FilmImplementation()
    }
    index(){
        return this.FilmImplementation.index()
    }
    store(filmFields, adminId, image, _video){
        return this.FilmImplementation.store(filmFields, adminId, image, _video)
    }

    update(id, name, duration, description, price, image, adminId){
        const filmfields = { name, duration, description, price }
        return this.FilmImplementation.update({ id }, filmfields, adminId, image)
    }

    destroy(_id){
        return this.FilmImplementation.destroy(_id)
    }

    show(_id){
        return this.FilmImplementation.show(_id);
    }
}

export default FilmService
