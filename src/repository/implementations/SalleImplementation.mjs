import SalleInterface from "../interfaces/SalleInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import Salle from "../../schema/SalleSchema.mjs";
import SalleModel from "../../models/SalleModel.mjs";

class SalleImplementation extends SalleInterface{
    constructor() {
        super();
        this.salleDao = new GenericDao(Salle)
    }

    store(salleFields, _admin_id) {
        const {name, type, capacity} = salleFields
        const salleObj = new SalleModel(name, type, capacity, _admin_id)

        const salle = {
            name: salleObj.getName(),
            type: salleObj.getType(),
            capacity: salleObj.getCapacity(),
            admin_id: _admin_id
        }

        return this.salleDao.save(salle).then((result) => {
            return result
        })
    }

    index(){
        return this.salleDao.findAll().then((result) => {
            return result
        })
    }

    destroy(_id){
        return this.salleDao.delete(_id).then((result) => {
            return result
        })
    }
}

export default SalleImplementation