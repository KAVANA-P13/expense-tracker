const mongoose = require('mongoose');
const { Expense, VALID_CATEGORIES } = require('../models/Expense');

function validateExpensePayload(body) {
  const { title, amount, category, date } = body || {};

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return 'Title is required and cannot be empty';
  }

  const parsedAmount = Number(amount);
  if (amount === undefined || amount === null || amount === '' || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    return 'Amount must be greater than 0';
  }

  if (!category || !VALID_CATEGORIES.includes(category)) {
    return `Category must be one of: ${VALID_CATEGORIES.join(', ')}`;
  }

  if (!date) {
    return 'Date is required';
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return 'Date must be a valid date (e.g., YYYY-MM-DD)';
  }

  return null;
}

const createExpense = async (req, res, next) => {
  try {
    const validationError = validateExpensePayload(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { title, amount, category, date } = req.body;
    const expense = await Expense.create({
      title: title.trim(),
      amount: Number(amount),
      category,
      date: new Date(date),
    });

    return res.status(201).json(expense);
  } catch (error) {
    return next(error);
  }
};

const getExpenses = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      if (!VALID_CATEGORIES.includes(category)) {
        return res.status(400).json({
          message: `Invalid category filter. Choose from: All, ${VALID_CATEGORIES.join(', ')}`,
        });
      }
      filter.category = category;
    }

    const expenses = await Expense.find(filter).sort({ date: -1, createdAt: -1 });
    return res.status(200).json(expenses);
  } catch (error) {
    return next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const validationError = validateExpensePayload(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { title, amount, category, date } = req.body;
    const updated = await Expense.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        amount: Number(amount),
        category,
        date: new Date(date),
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.status(200).json({ message: 'Expense deleted successfully', id: deleted._id });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createExpense, getExpenses, updateExpense, deleteExpense };