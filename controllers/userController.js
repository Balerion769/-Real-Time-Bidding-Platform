const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (db) => {
    const register = async (req, res) => {
        const { username, password, email } = req.body;
        try {
            const hash = await bcrypt.hash(password, 10);
            const result = await db.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', [username, hash, email]);
            res.status(201).json({ message: 'User registered', user: result.rows[0] });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    const login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (result.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(password, result.rows[0].password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: result.rows[0].id, role: result.rows[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.json({ message: 'Logged in successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    const profile = async (req, res) => {
        const { id } = req.user;
        try {
            const result = await db.query('SELECT username, email, role, created_at FROM users WHERE id = $1', [id]);
            res.json(result.rows[0]);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    return {
        register,
        login,
        profile
    };
};
