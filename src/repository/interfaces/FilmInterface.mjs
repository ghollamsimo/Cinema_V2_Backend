class FilmInterface {
    constructor(){
        if(new.target === FilmInterface){
            throw new Error('It is an abstract class can not be instancited');
        }

    }

    index(){
        throw new Error('Must be Implemented!!');
    }

    store(filmfields, adminId, _image, genre_id , _video){
        throw new Error('Must be Implemented!!');
    }

    update(_id, filmfields, adminId, _image){
        throw new Error('Must be Implemented!!');
    }

    destroy(_id){
        throw new Error('Must be Implemented!!');
    }

    show(_id){
        throw new Error('Must be Implemented!!');
    }
}

export default FilmInterface