class ReservationModel {
    constructor(sessionId, seatId, clientId) {
        this.clientId = clientId
        this.sessionId = sessionId
        this.seatId = seatId
    }

    getClientId(){
        return this.clientId
    }

    getSessionId(){
        return this.sessionId
    }

    getSeatId(){
        return this.seatId
    }
}

export default ReservationModel