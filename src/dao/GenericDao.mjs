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

    async findByUserId(userId) {
        try {
            return await this.schema.findOne({ user: userId }).exec();
        } catch (error) {
            throw new Error("Error retrieving entity information");
        }
    }

    async findByUserEmail(email) {
        try {
            return await this.schema.findOne({ email }).exec();
        } catch (error) {
            throw new Error("Error retrieving entity information");
        }
    }

    async findById(id) {
        try {
            const entity = await this.schema.findById(id).exec();
            if (!entity) {
                throw new Error("Entity not found");
            }
            return entity;
        } catch (error) {
            throw new Error("Error retrieving entity information");
        }
    }

    async update(id, updatedData) {
        const entity = await this.findById(id);
        Object.assign(entity, updatedData);
        return entity.save();
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