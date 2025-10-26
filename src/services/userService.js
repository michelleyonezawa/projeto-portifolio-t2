const users = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'supersecret';

function registerUser({ username, password }) {
    if (users.find(u => u.username === username)) {
        throw new Error('Usuário já existe');
    }
    const hash = bcrypt.hashSync(password, 8);
    const user = { id: users.length + 1, username, password: hash };
    users.push(user);
    return { id: user.id, username: user.username };
}

function loginUser({ username, password }) {
    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error('Credenciais inválidas');
    }
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1d' });
    return { token };
}

function getUserById(id) {
    return users.find(u => u.id === id);
}

module.exports = { registerUser, loginUser, getUserById, SECRET };
