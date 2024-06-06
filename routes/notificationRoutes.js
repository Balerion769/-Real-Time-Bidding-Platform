const express = require('express');
const auth = require('../middlewares/auth');

module.exports = (db) => {
    const { getNotifications, markNotificationsAsRead } = require('../controllers/notificationController')(db);
    const router = express.Router();

    router.get('/', auth, getNotifications);
    router.post('/mark-read', auth, markNotificationsAsRead);

    return router;
};
