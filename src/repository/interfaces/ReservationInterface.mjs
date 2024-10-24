class ReservationInterface {
    constructor() {
        if(new.target === ReservationInterface){
            throw new Error('It is an abstract class can not be instancited');
        }
    }

    store(reservationField, _session_id, _client_id){
        throw new Error('Must be Implemented!!');
    }
}

export default ReservationInterface