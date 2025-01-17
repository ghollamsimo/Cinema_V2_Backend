class GenericDao {
    constructor(schema) {
        this.schema = schema;
    }

    async save(entity) {
        return this.schema.create(entity);
    }

    saveMany(entities) {
        return this.schema.insertMany(entities);
    }

    updateMany(filter){
        return this.schema.updateMany(filter)
    }

    deleteMany(filter) {
        return this.schema.deleteMany(filter);
    }

    async findByUserId(userId) {
        return await this.schema.findOne({ user: userId }).exec();
    }

    async findByUserEmail(email) {
        return await this.schema.findOne({ email }).exec();
    }

    async findById(id) {
        return this.schema.findById({_id: id}).exec();
    }

    async find(query) {
        return await this.schema.find(query).exec();
    }

    async update(id, updatedData) {
        return this.schema.findByIdAndUpdate(id, updatedData, { new: true });
    }

    async delete(id) {
        return this.schema.findByIdAndDelete(id);
    }

    async deleteByClientId(id, client_id) {
        const entity = await this.schema.findOne({ _id: id, client_id: client_id });
        return entity.remove();
    }
    async findAll() {
        return this.schema.find().exec();
    }

    findByFilmId(film_id) {
        return this.schema.findById({film_id: film_id}).exec();
    }
}

export default GenericDao;