import SalleInterface from "../interfaces/SalleInterface.mjs";
import GenericDao from "../../dao/GenericDao.mjs";
import Salle from "../../schema/SalleSchema.mjs";
import SalleModel from "../../models/SalleModel.mjs";
import Seats from "../../schema/SeatSchema.mjs";

class SalleImplementation extends SalleInterface{
    constructor() {
        super();
        this.salleDao = new GenericDao(Salle)
        this.seatsDao = new GenericDao(Seats)
    }

    store(salleFields, _admin_id) {
        const { name, type, capacity } = salleFields;
        const salleObj = new SalleModel(name, type, capacity, _admin_id);

        const salle = {
            name: salleObj.getName(),
            type: salleObj.getType(),
            capacity: salleObj.getCapacity(),
            admin_id: _admin_id
        };

        return this.salleDao.save(salle).then((savedSalle) => {
            if (savedSalle) {
                const seatsToCreate = [];

                for (let i = 1; i <= savedSalle.capacity; i++) {
                    seatsToCreate.push({
                        seats: i,
                        salle_id: savedSalle._id,
                        status: 'Available'
                    });
                }

                return this.seatsDao.saveMany(seatsToCreate).then(() => {
                    return savedSalle;
                });
            }

            return null;
        }).catch((error) => {
            console.error('Error saving salle or seats:', error);
            throw error;
        });
    }


    index(){
        return this.salleDao.findAll().then((result) => {
            return result
        })
    }

    destroy(_id) {
        return this.salleDao.delete(_id)
            .then((result) => {
                if (result) {
                    return this.seatsDao.deleteMany({ salle_id: _id });
                }
                return result;
            })
            .catch((error) => {
                throw new Error(error.message);
            });
    }
}

export default SalleImplementation