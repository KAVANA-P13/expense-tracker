# Expense Tracker Web Application

**Track:** MERN Stack (MongoDB, Express.js, React, Node.js)  
**Submitted By:** Kavana P 
**Organization:** HemSethu Technologies — Internship Task 

A full-stack Expense Tracker web application where users can record daily expenses, view all saved expenses in one place, edit or delete entries, filter by category, and see the live total amount spent.

## Technologies Used
- **Frontend:** React, Vite, Axios, CSS3
- **Backend:** Node.js, Express.js, CORS, dotenv
- **Database:** MongoDB, Mongoose (`expenses` collection)
- **API Testing:** Postman (`postman_collection.json`)

## Steps to Run Locally

### 1. Start the Backend
```bash
cd backend
npm install
# Create .env with PORT=5000 and MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker
npm run dev

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

## REST API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/expenses` | Adds a new expense (`title`, `amount`, `category`, `date`) |
| `GET` | `/api/expenses` | Returns all expenses; supports `?category=Food` |
| `PUT` | `/api/expenses/:id` | Updates an expense by ID |
| `DELETE` | `/api/expenses/:id` | Deletes an expense by ID |

*(See `postman_collection.json` in this repository for the full Postman collection.)*

## Screenshots

### Home Page
[docs/screenshots/home.png]

### Add Expense
[docs/screenshots/add-expense.png]

### Edit Expense
[docs/screenshots/edit-expense.png]

### Filter by Category
[docs/screenshots/filter-category.png]

