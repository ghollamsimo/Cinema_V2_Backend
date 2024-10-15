class FilmModel {
    constructor(id, name, duration, adminId, price, description) {
        this.name = name;
        this.duration = duration;
        this.adminId = adminId;
        this.id = id
        this.price = price;
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

    getPrice() {
        return this.price;
    }
}
export default FilmModel