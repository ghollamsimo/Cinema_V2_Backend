class UserModel {
    constructor(name, email, password, role = ['Client']) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = Array.isArray(role) ? role : [role];
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getRole() {
        return this.role;
    }

}

export default UserModel;