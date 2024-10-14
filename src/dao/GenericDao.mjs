class GenericDao {
    constructor(schema) {
        this.schema = schema;
    }

    async save(entity) {
        return this.schema.create(entity);
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
        const entity = await this.findById(id);
        return entity.remove();
    }

    async findAll() {
        return this.schema.find().exec();
    }
}

export default GenericDao;