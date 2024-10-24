import AuthImplementation from "../repository/implementations/AuthImplementation.mjs";

class AuthService {
    constructor() {
        this.AuthImplementation = new AuthImplementation()
    }

    register(userfields){
        return this.AuthImplementation.register(userfields)
    }

    login(email, password){
        return this.AuthImplementation.login(email, password)
    }

    show(_id){
        return this.AuthImplementation.show(_id)
    }
}

export default AuthService