const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {

        console.log('Verifying token...');
        const token = req.header('x-auth-token');
        console.log('Received token:', token);

        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        try {
            console.log('Attempting to verify token');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token verified successfully:', decoded);
            req.admin = decoded.admin;
            next();
        } catch (err) {
            console.error('Token verification failed:', err);
            res.status(401).json({ message: 'Token is not valid' });
        }
    }

module.exports = verifyToken;