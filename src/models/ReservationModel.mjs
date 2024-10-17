class ReservationModel {
    constructor(clientId, sessionId, seatId) {
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