import ReservationController from "../controllers/ReservationController.mjs";

class ReservationError {
    constructor() {
        this.ReservationController = new ReservationController()
    }

    store(req, res){
        try {
            return this.ReservationController.store(req, res)
        }catch (err){
            throw new Error(err)
        }
    }
}

export default new ReservationError()