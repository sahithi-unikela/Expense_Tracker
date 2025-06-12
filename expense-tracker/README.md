# MERN Expense Tracker

A full-stack Expense Tracker Web Application using the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to Register, Login, Add, View, Edit, and Delete expenses. Each user has access to their own expense data, and all operations are logged and displayed in a History section.

## Features

### Authentication Module
- User registration with secure password hashing
- User login with JWT authentication
- Protected routes for authenticated users

### Expense Management (CRUD)
- Add new expenses with amount, category, date, and description
- View all expenses in a table format
- Edit existing expenses
- Delete expenses

### Expense History Log
- Track all expense operations (add, update, delete)
- View detailed history with timestamps
- See what changed in updates

### Bonus Features
- Data visualization with charts (category distribution and monthly spending)
- Filter expenses by date, category, and amount
- Export expenses to CSV

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Chart.js for data visualization
- Axios for API requests
- JWT for authentication

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Installation

### Prerequisites
- Node.js
- MongoDB

### Setup

1. Clone the repository:
```
git clone https://github.com/sahithi-unikela/Expense_Tracker
cd Expense_Tracker
```

2. Install server dependencies:
```
cd server
npm install
```

3. Install client dependencies:
```
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following:
```
MONGO_URI=mongodb://localhost:27017/Expense_Tracker
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Running the Application

1. Start the server:
```
cd server
npm run dev
```

2. Start the client:
```
cd client
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Expenses
- `GET /api/expenses` - Get all expenses for logged in user
- `GET /api/expenses/:id` - Get a specific expense
- `POST /api/expenses` - Add a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

### History
- `GET /api/history` - Get history logs for logged in user
