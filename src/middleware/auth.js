const jwt = require('jsonwebtoken');
const { SECRET } = require('../services/userService');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token inválido' });
    try {
        const user = jwt.verify(token, SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
}

module.exports = authMiddleware;
