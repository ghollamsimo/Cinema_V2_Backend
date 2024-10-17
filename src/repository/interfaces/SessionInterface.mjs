class SessionInterface {
    constructor() {
        if(new.target === SessionInterface){
            throw new Error('It is an abstract class can not be instancited');
        }
    }

    store(sessionFields, _admin_id){
        throw new Error('Must be Implemented!!');
    }

    destroy(_id){
        throw new Error('Must be Implemented!!');
    }
}

export default SessionInterface