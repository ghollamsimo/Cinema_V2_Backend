import SessionImplementation from "../repository/implementations/SessionImplementation.mjs";

class SessionService {
    constructor() {
        this.SessionImplementation = new SessionImplementation()
    }

    store(sessionFields, _admin_id){
        return this.SessionImplementation.store(sessionFields, _admin_id)
    }

    destroy(_id){
        return this.SessionImplementation.destroy(_id)
    }
}

export default SessionService