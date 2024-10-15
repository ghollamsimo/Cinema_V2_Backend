class FilmModel {
    constructor(id, name, duration, adminId, description) {
        this.name = name;
        this.duration = duration;
        this.adminId = adminId;
        this.id = id
        this.description = description;
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