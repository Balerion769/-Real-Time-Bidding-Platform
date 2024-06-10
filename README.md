# Real-Time Bidding Platform

## Introduction
This project is a real-time bidding platform built using Node.js, Express, PostgreSQL, and Socket.IO. The platform allows users to create items, place bids, and receive real-time notifications about bid updates and other important events.

## Table of Contents:
1. [Features](#features)
2. [Setup](#setup)
3. [Running the Project](#running-the-project)
4. [API Endpoints](#api-endpoints)
5. [WebSocket Events](#websocket-events)

## Features:
1. User authentication and authorization
2. Item management (create, read, update, delete)
3. Real-time bidding on items
4. Real-time notifications using Socket.IO
5. Persistent notifications stored in PostgreSQL

## Setup

### Prerequisites
Ensure you have the following installed on your system:
1. Node.js (v14 or later)
2. PostgreSQL (v12 or later)
3. npm (v6 or later)

### Environment Variables
Create a `.env` file in the root of the project and add the following variables:
1. PORT=3000
2. JWT_SECRET=your_jwt_secret
3. DB_HOST=localhost
4. DB_USER=your_db_user
5. DB_PASSWORD=your_db_password
6. DB_NAME=your_db_name


### Database Setup
1. Create a PostgreSQL database and user with the necessary privileges.
2. Run the following SQL commands to create the required tables:

```sql
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
```

### Installation(copy code step  by step)
```bash
git clone https://github.com/Balerion769/-Real-Time-Bidding-Platform.git
cd real-time-bidding-platform
npm install
```

### Running the project
```bash
npx nodemon app.js
```

## API Endpoints


### User Routes
1. Register a New User
2. URL: /users/register
3. Method: POST
4. Body: (JSON)

```JSON
{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "password123"
}

Response:
{
    "message": "User registered",
    "user": {...}
}
```




### User Login
1. URL: /users/login
2. Method: POST
3. Body: (JSON)
```JSON
{
    "email": "newuser@example.com",
    "password": "password123"
}

Response:
{
    "message": "Logged in successfully"
}
```






### Get User Profile
1. URL: /users/profile
2. Method: GET
3. Headers: Authorization: Bearer <token>
4. Response:
```JSON

{
    "username": "newuser",
    "email": "newuser@example.com",
    "role": "user",
    "created_at": "2021-01-01T00:00:00.000Z"
}
```


### Item Routes
1. Get All Items
2. URL: /items
3. Method: GET
4. Response:
```JSON
[
    { ... },
    { ... }
]
```



### Get Item by ID
1. URL: /items/:id
2. Method: GET
3. Response:
```JSON
{ ... }
```


### Create a New Item
1. URL: /items
2. Method: POST
3. Headers: Authorization: Bearer <token>
4. Body: (JSON)
```JSON
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
```





### Update an Item
1. URL: /items/:id
2. Method: PUT
3. Headers: Authorization: Bearer <token>
Body: (JSON)
```JSON
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
```



### Delete an Item
1. URL: /items/:id
2. Method: DELETE
3. Headers: Authorization: Bearer <token>
```JSON
Response:
{
    "message": "Item deleted"
}
```





### Bid Routes
1. Get Bids by Item ID
2. URL: /bids/:itemId/bids
3. Method: GET
```JSON
Response:
[
    { ... },
    { ... }
]
```



### Place a Bid
1. URL: /bids/:itemId/bids
2. Method: POST
3. Headers: Authorization: Bearer <token>
4. Body: (JSON)
```JSON
{
    "bid_amount": 2000
}
Response:
{
    "message": "Bid placed",
    "bid": { ... }
}
```


### Notification Routes
1. Get Notifications
2. URL: /notifications
3. Method: GET
4. Headers: Authorization: Bearer <token>
```JSON
Response:
[
    { ... },
    { ... }
]
```



### Mark Notifications as Read
1. URL: /notifications/mark-read
2. Method: POST
3. Headers: Authorization: Bearer <token>
```JSON
Response:
{
    "message": "Notifications marked as read"
}
```



## WebSocket Events
### Bid Update
1. Event: update
2. Description: Emitted when a new bid is placed.
3. Payload: (JSON)

```JSON
{
    "id": 1,
    "item_id": 1,
    "user_id": 1,
    "bid_amount": 2000,
    "created_at": "2021-01-01T00:00:00.000Z"
}
```

### Notification
1. Event: notification
2. Description: Emitted when a new notification is created.
3. Payload: (JSON)
```JSON
{
    "id": 1,
    "user_id": 1,
    "message": "New bid placed by user 1 on item 1 with amount 2000",
    "is_read": false,
    "created_at": "2021-01-01T00:00:00.000Z"
}
```

## Conclusion
This README provides a comprehensive guide to setting up, running, and understanding the real-time bidding platform. If you have any questions or encounter any issues, please feel free to open an issue on the GitHub repository or contact the project maintainers.





