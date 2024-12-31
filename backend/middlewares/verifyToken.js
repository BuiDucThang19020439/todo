const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send('Invalid Token');
            req.user = user;
        next();

        });
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
};

module.exports = {authenticateToken};