import React, { useCallback, useEffect, useState } from 'react';
import { createExpense, deleteExpense, fetchExpenses, updateExpense } from './api/expenseApi';
import TotalSummary from './components/TotalSummary';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const loadExpenses = useCallback(async (category) => {
    setLoading(true);
    setApiError('');
    try {
      const data = await fetchExpenses(category);
      setExpenses(data);
    } catch (error) {
      setApiError(error.response?.data?.message || 'Unable to load expenses. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses(selectedCategory);
  }, [selectedCategory, loadExpenses]);

  const handleSaveExpense = async (formData) => {
    setIsSubmitting(true);
    setApiError('');
    try {
      if (editingExpense) {
        const updated = await updateExpense(editingExpense._id, formData);
        setExpenses((prev) => {
          const next = prev.map((item) => (item._id === updated._id ? updated : item));
          if (selectedCategory !== 'All' && updated.category !== selectedCategory) {
            return next.filter((item) => item._id !== updated._id);
          }
          return next;
        });
        setEditingExpense(null);
      } else {
        const created = await createExpense(formData);
        if (selectedCategory === 'All' || created.category === selectedCategory) {
          setExpenses((prev) => [created, ...prev]);
        }
      }
      return true;
    } catch (error) {
      setApiError(error.response?.data?.message || 'Failed to save expense. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    setApiError('');
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((item) => item._id !== id));
      if (editingExpense && editingExpense._id === id) setEditingExpense(null);
    } catch (error) {
      setApiError(error.response?.data?.message || 'Failed to delete expense. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <p className="app-subtitle">Track daily spending, filter by category, and manage your budget</p>
      </header>
      <main className="main-content">
        <TotalSummary expenses={expenses} selectedCategory={selectedCategory} />
        {apiError && <div className="api-error" role="alert">{apiError}</div>}
        <ExpenseForm
          onSubmit={handleSaveExpense}
          editingExpense={editingExpense}
          onCancelEdit={() => setEditingExpense(null)}
          isSubmitting={isSubmitting}
        />
        <section className="card list-card">
          <div className="list-header">
            <h3>Expenses</h3>
            <ExpenseFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          </div>
          <ExpenseList expenses={expenses} onEdit={setEditingExpense} onDelete={handleDeleteExpense} loading={loading} />
        </section>
      </main>
    </div>
  );
}

export default App;