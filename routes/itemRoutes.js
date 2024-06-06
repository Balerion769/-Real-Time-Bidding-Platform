const express = require('express');
const auth = require('../middlewares/auth');

module.exports = (db) => {
    const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController')(db);
    const router = express.Router();

    router.get('/', getItems);
    router.get('/:id', getItemById);
    router.post('/', auth, createItem);
    router.put('/:id', auth, updateItem);
    router.delete('/:id', auth, deleteItem);

    return router;
};
