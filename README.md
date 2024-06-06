


Real-Time Bidding Platform

Introduction
This project is a real-time bidding platform built using Node.js, Express, PostgreSQL, and Socket.IO. The platform allows users to create items, place bids, and receive real-time notifications about bid updates and other important events.

Table of Contents:
1.Features
2.Setup
3.Running the Project
4.API Endpoints
5.WebSocket Events



Features:
1.User authentication and authorization
2.Item management (create, read, update, delete)
3.Real-time bidding on items
4.Real-time notifications using Socket.IO
5.Persistent notifications stored in PostgreSQL



Setup
Prerequisites

Ensure you have the following installed on your system:

1.Node.js (v14 or later)
2.PostgreSQL (v12 or later)
3.npm (v6 or later)




Environment Variables

Create a '.env' file in the root of the project and add the following variables:

PORT=3000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name




Database Setup

Create a PostgreSQL database and user with the necessary privileges.
Run the following SQL commands to create the required tables:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    starting_price INTEGER NOT NULL,
    current_price INTEGER NOT NULL,
    end_time TIMESTAMP
);

CREATE TABLE bids (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES items(id),
    user_id INTEGER REFERENCES users(id),
    bid_amount INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




Installation

1.Clone the repository paste following code in Terminal :

git clone https://github.com/yourusername/real-time-bidding-platform.git
cd real-time-bidding-platform

2.Install dependencies(copy code in terminal):
npm install



Running the Project
Development
To run the project in development mode(copy given code in ternminal):
npx nodemon app.js


The server will start on the port specified in your .env file (default is 3000).




API Endpoints


User Routes
Register a New User
URL: /users/register
Method: POST
Body: (JSON)
{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "password123"
}

Response:
{
    "message": "User registered",
    "user": { ... }
}




User Login
URL: /users/login
Method: POST
Body: (JSON)
{
    "email": "newuser@example.com",
    "password": "password123"
}

Response:
{
    "message": "Logged in successfully"
}






Get User Profile
URL: /users/profile
Method: GET
Headers: Authorization: Bearer <token>
Response:
json
Copy code
{
    "username": "newuser",
    "email": "newuser@example.com",
    "role": "user",
    "created_at": "2021-01-01T00:00:00.000Z"
}


Item Routes
Get All Items
URL: /items
Method: GET
Response:

[
    { ... },
    { ... }
]



Get Item by ID
URL: /items/:id
Method: GET
Response:
{ ... }



Create a New Item
URL: /items
Method: POST
Headers: Authorization: Bearer <token>
Body: (JSON)
{
    "name": "Bottle",
    "description": "To Drink water",
    "starting_price": 1000,
    "end_time": ""
}
Response:
{
    "message": "Item created",
    "item": { ... }
}




Update an Item
URL: /items/:id
Method: PUT
Headers: Authorization: Bearer <token>
Body: (JSON)
{
    "name": "Bottle",
    "description": "To Drink water",
    "starting_price": 1000,
    "end_time": "2022-01-01T00:00:00.000Z"
}
Response:
{
    "message": "Item updated",
    "item": { ... }
}



Delete an Item
URL: /items/:id
Method: DELETE
Headers: Authorization: Bearer <token>
Response:
{
    "message": "Item deleted"
}





Bid Routes
Get Bids by Item ID
URL: /bids/:itemId/bids
Method: GET
Response:
[
    { ... },
    { ... }
]



Place a Bid
URL: /bids/:itemId/bids
Method: POST
Headers: Authorization: Bearer <token>
Body: (JSON)
{
    "bid_amount": 2000
}
Response:
{
    "message": "Bid placed",
    "bid": { ... }
}



Notification Routes
Get Notifications
URL: /notifications
Method: GET
Headers: Authorization: Bearer <token>
Response:
[
    { ... },
    { ... }
]




Mark Notifications as Read
URL: /notifications/mark-read
Method: POST
Headers: Authorization: Bearer <token>
Response:
{
    "message": "Notifications marked as read"
}




WebSocket Events
Bid Update
Event: update
Description: Emitted when a new bid is placed.
Payload: (JSON)
{
    "id": 1,
    "item_id": 1,
    "user_id": 1,
    "bid_amount": 2000,
    "created_at": "2021-01-01T00:00:00.000Z"
}


Notification
Event: notification
Description: Emitted when a new notification is created.
Payload: (JSON)
{
    "id": 1,
    "user_id": 1,
    "message": "New bid placed by user 1 on item 1 with amount 2000",
    "is_read": false,
    "created_at": "2021-01-01T00:00:00.000Z"
}
Conclusion
This README provides a comprehensive guide to setting up, running, and understanding the real-time bidding platform. If you have any questions or encounter any issues, please feel free to open an issue on the GitHub repository or contact the project maintainers.

This README covers the essential aspects of your project, including setup, running the project, API endpoint documentation, and WebSocket events. It provides clear instructions for other developers to understand and use your project effectively.










