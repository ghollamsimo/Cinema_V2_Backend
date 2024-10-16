import SalleImplementation from "../repository/implementations/SalleImplementation.mjs";

class SalleService {
    constructor() {
        this.SalleImplementation = new SalleImplementation()
    }

    store(salleFields, _admin_id) {
        return this.SalleImplementation.store(salleFields, _admin_id)
    }

    index(){
        return this.SalleImplementation.index()
    }

    destroy(_id){
        return this.SalleImplementation.destroy(_id)
    }
}

export default SalleService