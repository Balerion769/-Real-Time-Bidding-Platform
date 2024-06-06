const express = require('express');
const auth = require('../middlewares/auth');

module.exports = (db, io) => {
    const { getBidsByItem, placeBid } = require('../controllers/bidController')(db, io);
    const router = express.Router();

    router.get('/:itemId/bids', getBidsByItem);
    router.post('/:itemId/bids', auth, placeBid);

    return router;
};
