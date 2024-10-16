class SalleModel{
    constructor(name, type, capacity, adminId) {
        this.name = name;
        this.type = type
        this.capacity = capacity;
        this.adminId = adminId;
    }

    getName(){
        return this.name
    }

    getType() {
        return this.type
    }

    getCapacity(){
        return this.capacity
    }

    getAdminId(){
        return this.adminId
    }
}

export default SalleModel