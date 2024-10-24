class FilmModel {
    constructor(id, name, duration, adminId, description, genre_id, video) {
        this.name = name;
        this.duration = duration;
        this.adminId = adminId;
        this.id = id
        this.genre_id = genre_id;
        this.description = description;
        this.video = video;
    }

    getName() {
        return this.name;
    }

    getDuration() {
        return this.duration;
    }

    getAdminId() {
        return this.adminId;
    }

    getId(){
        return this.id
    }

    getDescription() {
        return this.description;
    }

}
export default FilmModel