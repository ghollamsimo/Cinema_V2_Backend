import SessionImplementation from "../repository/implementations/SessionImplementation.mjs";

class SessionService {
    constructor() {
        this.SessionImplementation = new SessionImplementation()
    }

    store(sessionFields, _admin_id){
        return this.SessionImplementation.store(sessionFields, _admin_id)
    }
}

export default SessionService