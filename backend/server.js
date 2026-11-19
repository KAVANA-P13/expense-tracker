const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Expense Tracker API is running' });
});

app.use('/api/expenses', expenseRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON payload' });
  }
  if (err.name === 'ValidationError') {
    const firstMsg = Object.values(err.errors)[0]?.message || 'Validation failed';
    return res.status(400).json({ message: firstMsg });
  }
  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Expense not found' });
  }
  console.error('Server error:', err);
  return res.status(500).json({ message: 'Internal server error' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});