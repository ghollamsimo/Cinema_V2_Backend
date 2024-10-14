import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ msg: 'Invalid authorization format' });
    }

    const token = parts[1];

    try {
        req.user = jwt.verify(token, process.env.APP_JWT);
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ msg: 'Invalid token' });
    }
};

export default authenticateJWT;