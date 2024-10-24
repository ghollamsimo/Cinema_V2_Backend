import AuthService from "../services/AuthService.mjs";

class AuthController {
    constructor() {
        this.AuthService = new AuthService();
    }

    async register(req, res) {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const userFields = { name, email, password, role };
        await this.AuthService.register(userFields);
            return res.status(201).json({ message: 'Registration successful' });

    }

    async login(req, res) {
         const { email, password } = req.body;
         const { user, token } = await this.AuthService.login(email, password);

         return res.status(200).json({ message: 'Login successful', user, token });

    }

    async show(req, res) {
        const {id} = req.params
        const user = await this.AuthService.show(id)
        return res.json(user)
    }
}

export default AuthController;
