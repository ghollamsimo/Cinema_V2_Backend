class SalleInterface {
    constructor(){
        if(new.target === SalleInterface){
            throw new Error('It is an abstract class can not be instancited');
        }

    }

    store(salleFields, ){
        throw new Error('Must be Implemented!!');
    }
}