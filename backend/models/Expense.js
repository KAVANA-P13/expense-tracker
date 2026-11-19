const mongoose = require('mongoose');

const VALID_CATEGORIES = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      validate: {
        validator: (value) => typeof value === 'number' && !Number.isNaN(value) && value > 0,
        message: 'Amount must be greater than 0',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: VALID_CATEGORIES,
        message: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`,
      },
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
  },
  {
    collection: 'expenses',
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

module.exports = {
  Expense: mongoose.model('Expense', expenseSchema),
  VALID_CATEGORIES,
};