module.exports = (db, io) => {
    const getBidsByItem = async (req, res) => {
        const { itemId } = req.params;
        try {
            const result = await db.query('SELECT * FROM bids WHERE item_id = $1', [itemId]);
            res.json(result.rows);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    const placeBid = async (req, res) => {
        const { itemId } = req.params;
        const { bid_amount } = req.body;
        const { id: userId } = req.user;
        try {
            const result = await db.query('INSERT INTO bids (item_id, user_id, bid_amount) VALUES ($1, $2, $3) RETURNING *', [itemId, userId, bid_amount]);
            await db.query('UPDATE items SET current_price = $1 WHERE id = $2', [bid_amount, itemId]);
            io.emit('update', result.rows[0]);
            res.status(201).json({ message: 'Bid placed', bid: result.rows[0] });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    return {
        getBidsByItem,
        placeBid
    };
};
