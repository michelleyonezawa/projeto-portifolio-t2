const userService = require('../services/userService');

exports.register = (req, res) => {
    try {
        const user = userService.registerUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = (req, res) => {
    try {
        const result = userService.loginUser(req.body);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};
