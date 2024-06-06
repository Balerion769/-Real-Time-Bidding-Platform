module.exports = (db) => {
    const getNotifications = async (req, res) => {
        const { id: userId } = req.user;
        console.log('User ID:', userId); // Add logging
        try {
            const result = await db.query('SELECT * FROM notifications WHERE user_id = $1', [userId]);
            console.log('Notifications:', result.rows); // Add logging
            res.json(result.rows);
        } catch (error) {
            console.error('Error:', error.message); // Add logging
            res.status(400).json({ error: error.message });
        }
    };

    const markNotificationsAsRead = async (req, res) => {
        const { id: userId } = req.user;
        console.log('User ID:', userId); // Add logging
        try {
            await db.query('UPDATE notifications SET is_read = true WHERE user_id = $1', [userId]);
            res.json({ message: 'Notifications marked as read' });
        } catch (error) {
            console.error('Error:', error.message); // Add logging
            res.status(400).json({ error: error.message });
        }
    };

    return {
        getNotifications,
        markNotificationsAsRead
    };
};
