module.exports = (db) => {
    const getItems = async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM items');
            res.json(result.rows);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    const getItemById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await db.query('SELECT * FROM items WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ message: 'Item not found' });
            res.json(result.rows[0]);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    const createItem = async (req, res) => {
        const { name, description, starting_price, end_time } = req.body;
        const adjustedEndTime = end_time === "" ? new Date(Date.now() + 24 * 60 * 60 * 1000) : end_time; // Set default to 24 hours ahead if empty

        try {
            const result = await db.query(
                'INSERT INTO items (name, description, starting_price, current_price, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [name, description, starting_price, starting_price, adjustedEndTime]
            );
            res.status(201).json({ message: 'Item created', item: result.rows[0] });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    const updateItem = async (req, res) => {
        const { id } = req.params;
        const { name, description, starting_price, end_time } = req.body;
        const adjustedEndTime = end_time === "" ? new Date(Date.now() + 24 * 60 * 60 * 1000) : end_time; // Set default to 24 hours ahead if empty

        try {
            const result = await db.query(
                'UPDATE items SET name = $1, description = $2, starting_price = $3, end_time = $4 WHERE id = $5 RETURNING *',
                [name, description, starting_price, adjustedEndTime, id]
            );
            if (result.rows.length === 0) return res.status(404).json({ message: 'Item not found' });
            res.json({ message: 'Item updated', item: result.rows[0] });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    const deleteItem = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await db.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ message: 'Item not found' });
            res.json({ message: 'Item deleted', item: result.rows[0] });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    return {
        getItems,
        getItemById,
        createItem,
        updateItem,
        deleteItem
    };
};
