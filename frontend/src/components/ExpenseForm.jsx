import React, { useEffect, useState } from 'react';

const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];
const getTodayDate = () => new Date().toISOString().split('T')[0];
const formatDateForInput = (dateValue) =>
  dateValue ? new Date(dateValue).toISOString().split('T')[0] : getTodayDate();

function ExpenseForm({ onSubmit, editingExpense, onCancelEdit, isSubmitting }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(getTodayDate());
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title || '');
      setAmount(String(editingExpense.amount ?? ''));
      setCategory(editingExpense.category || 'Food');
      setDate(formatDateForInput(editingExpense.date));
      setError('');
    } else {
      setTitle('');
      setAmount('');
      setCategory('Food');
      setDate(getTodayDate());
      setError('');
    }
  }, [editingExpense]);

  const validateForm = () => {
    if (!title.trim()) return 'Title is required';
    const parsedAmount = Number(amount);
    if (amount === '' || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return 'Amount must be greater than 0';
    }
    if (!category || !CATEGORIES.includes(category)) return 'Please select a valid category';
    if (!date) return 'Date is required';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    const success = await onSubmit({
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    });
    if (success && !editingExpense) {
      setTitle('');
      setAmount('');
      setCategory('Food');
      setDate(getTodayDate());
    }
  };

  return (
    <section className="card form-card">
      <div className="card-header">
        <h3>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h3>
      </div>
      {error && <div className="form-error" role="alert">{error}</div>}
      <form onSubmit={handleSubmit} noValidate className="expense-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" placeholder="e.g., Lunch" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input id="amount" type="number" step="0.01" min="0.01" placeholder="e.g., 150" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} disabled={isSubmitting}>
              {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={isSubmitting} />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : editingExpense ? 'Save Changes' : 'Add Expense'}
          </button>
          {editingExpense && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit} disabled={isSubmitting}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ExpenseForm;