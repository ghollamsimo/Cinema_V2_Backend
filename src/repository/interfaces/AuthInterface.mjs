class AuthInterface{
    constructor(){
        if(new.target === AuthInterface){
            throw new Error('It is an abstract class can not be instancited');
        }

    }


    register(userfields){
        throw new Error('Must be Implemented!!');
    }

    login(email, password) {
        throw new Error('Method "login" must be implemented.');
    }

    logout(token){
        throw new Error('Must be Implemented!!');
    }

    forgot(userfield){
        throw new Error('Must be Implemented!!');
    }

    reset(token, password){
        throw new Error('Must be Implemented!!');
    }

    show(id){
        throw new Error('Must be Implemented!!');
    }
}
export default AuthInterface