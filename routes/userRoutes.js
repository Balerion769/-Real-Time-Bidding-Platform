const express = require('express');
const auth = require('../middlewares/auth');

module.exports = (db) => {
    const { register, login, profile } = require('../controllers/userController')(db);
    const router = express.Router();

    router.post('/register', register);
    router.post('/login', login);
    router.get('/profile', auth, profile);

    return router;
};
