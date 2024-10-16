class SalleInterface {
    constructor(){
        if(new.target === SalleInterface){
            throw new Error('It is an abstract class can not be instancited');
        }

    }

    store(salleFields, _admin_id){
        throw new Error('Must be Implemented!!');
    }


    index(){
        throw new Error('Must be Implemented!!');
    }

    destroy(_id){
        throw new Error('Must be Implemented!!');
    }
}

export default SalleInterface