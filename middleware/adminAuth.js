// middleware/adminAuth.js
import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Forbidden');
        }

        // Check if user is an admin
        if (user.role !== 'admin') {
            return res.status(403).send('Forbidden');
        }

        req.user = user; // Add user info to request object
        next();
    });
};

export default adminAuth;
