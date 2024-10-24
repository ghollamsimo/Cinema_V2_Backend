class SessionModel {
    constructor(filmId, hours, salleId, adminId, seat_id, started_date, end_date, status) {
        this.filmId = filmId;
        this.hours = hours;
        this.salleId = salleId;
        this.adminId = adminId;
        this.seat_id = seat_id
        this.started_date = started_date
        this.end_date = end_date
        this.status = status
    }

    getFilmId() {
        return this.filmId;
    }

    getHours() {
        return this.hours;
    }

    getSalleId() {
        return this.salleId;
    }

    getAdminId() {
        return this.adminId;
    }

    getSeatId(){
        return this.seat_id
    }
}

export default SessionModel;