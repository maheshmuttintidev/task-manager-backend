# Task Manager Backend API

This is the backend API for a Full Stack Task Manager app built using Node.js, Express, and MongoDB. The API includes user authentication (JWT-based) and task management features (CRUD operations).

## Features

- User Signup and Login with JWT-based authentication.
- Task management: Create, Read, Update, Delete tasks for logged-in users.
- Password hashing with bcrypt.js.
- Protected routes for task operations.
- Middleware for JWT token verification.

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose ODM)
- **bcrypt.js** for password hashing
- **jsonwebtoken** for JWT-based authentication
- **CORS** and Express JSON Middleware for request handling

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/task-manager-backend.git
cd task-manager-backend
```

### 2. Install Dependencies

`yarn`

### 3. Create `.env` file

Create a `.env` file in the root of your project and add the following environment variables:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key
```

- **MONGO_URI**: Replace with your MongoDB connection string.
- **JWT_SECRET**: Replace with your preferred secret for signing JWT tokens.

### 4. Run the server

`yarn dev`

The server will start on `http://localhost:3000`.

---

## API Endpoints

### Authentication

#### 1. Sign Up

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Description**: Register a new user.
- **Request Body**:

```json
{
  "name": "Pickolo Sama",
  "email": "pickolosama@dragonballdiama.com",
  "password": "pickolosama#sensei"
}
```

#### 2. Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticate a user and get a JWT token.
- **Request Body**:

```json
{
  "email": "pickolosama@dragonballdiama.com",
  "password": "pickolosama#sensei"
}
```

- **Response**:

```json
{
  "token": "<your_jwt_token>"
}
```

### Task Management (Protected Routes)

> All task routes require the `Authorization: Bearer <JWT>` header.

#### 1. Create a Task

- **URL**: `/tasks`
- **Method**: `POST`
- **Description**: Create a new task.
- **Request Body**:

```json
{
  "title": "Create Dragon Balls",
  "description": "Finish the dragon balls creation by evening"
}
```

#### 2. Get All Tasks

- **URL**: `/tasks`
- **Method**: `GET`
- **Description**: Get all tasks for the logged-in user.

#### 3. Get a Task by ID

- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Description**: Get details of a specific task by its ID.

#### 4. Update a Task

- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Description**: Update a task by its ID.
- **Request Body**:

```json
{
  "title": "Updated task title",
  "description": "Updated task description"
}
```

#### 5. Delete a Task

- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Description**: Delete a task by its ID.

---

## Middleware

### `authMiddleware.js`

- Verifies the JWT token from the Authorization header.
- Attaches the decoded user ID to the req.user.

### Example Code:

```js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
```

---

## Folder Structure

```
task-manager-backend/
│
├── config/
│   └── db.js               # MongoDB connection setup
│
├── controllers/
│   └── authController.js    # User authentication (signup, login)
│   └── taskController.js    # Task CRUD operations
│
├── middleware/
│   └── authMiddleware.js    # JWT authentication middleware
│
├── models/
│   └── Task.js              # Mongoose schema for tasks
│   └── User.js              # Mongoose schema for users
│
├── routes/
│   └── authRoutes.js        # Routes for user authentication
│   └── taskRoutes.js        # Routes for task management
│
├── .env                     # Environment variables (MONGO_URI, JWT_SECRET)
├── .gitignore               # Files to ignore in git
├── package.json             # Project metadata and dependencies
├── server.js                # Entry point for the backend server
└── README.md                # API documentation (this file)

```
