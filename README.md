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