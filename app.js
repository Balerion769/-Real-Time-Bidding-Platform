const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const createUserRoutes = require('./routes/userRoutes');
const createItemRoutes = require('./routes/itemRoutes');
const createBidRoutes = require('./routes/bidRoutes');
const createNotificationRoutes = require('./routes/notificationRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Database connected');
    }
});

app.use(express.json());
app.use(cookieParser());

app.use('/users', createUserRoutes(db));
app.use('/items', createItemRoutes(db));
app.use('/bids', createBidRoutes(db, io));
app.use('/notifications', createNotificationRoutes(db));

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('bid', (data) => {
        io.emit('update', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { db, io };
