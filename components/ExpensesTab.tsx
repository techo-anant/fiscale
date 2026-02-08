'use client'

import { useState } from 'react'
import { Expense } from '@/types'

interface ExpensesTabProps {
  expenses: Expense[]
  setExpenses: (expenses: Expense[]) => void
}

export default function ExpensesTab({ expenses, setExpenses }: ExpensesTabProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('🍔 Food & Dining')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const categories = [
    '🍔 Food & Dining',
    '🚗 Transport',
    '🎮 Entertainment',
    '📚 Books & Supplies',
    '📦 Other'
  ]

  const addExpense = () => {
    if (!description || !amount || parseFloat(amount) <= 0) {
      alert('Please fill in all fields with valid values')
      return
    }

    const newExpense: Expense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      date
    }

    setExpenses([newExpense, ...expenses])
    
    setDescription('')
    setAmount('')
    setDate(new Date().toISOString().split('T')[0])
  }

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const getCategoryClass = (cat: string) => {
    if (cat.includes('Food')) return 'category-food'
    if (cat.includes('Transport')) return 'category-transport'
    if (cat.includes('Entertainment')) return 'category-entertainment'
    if (cat.includes('Books')) return 'category-books'
    return 'category-other'
  }

  return (
    <div className="dashboard">
      <div className="card">
        <div className="card-header">
          <span className="card-title">Add Expense</span>
          <span className="card-icon">➕</span>
        </div>
        
        <div className="input-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you buy?"
          />
        </div>

        <div className="input-group">
          <label>Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
          />
        </div>

        <div className="input-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={addExpense}>
          Add Expense
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Expenses</span>
          <span className="card-icon">📝</span>
        </div>
        
        {expenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p>No expenses yet</p>
            <p style={{ fontSize: '0.9em' }}>Start tracking your spending above</p>
          </div>
        ) : (
          <div>
            {expenses.map(expense => (
              <div key={expense.id} className="expense-item">
                <div className="expense-details">
                  <div style={{ fontWeight: '600', marginBottom: '5px' }}>{expense.description}</div>
                  <span className={`expense-category ${getCategoryClass(expense.category)}`}>
                    {expense.category}
                  </span>
                  <div style={{ color: '#b4b4b4', fontSize: '0.9em', marginTop: '5px' }}>
                    {new Date(expense.date).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div className="expense-amount" style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#ef4444' }}>
                    -${expense.amount.toFixed(2)}
                  </div>
                  <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
