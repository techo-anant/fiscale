'use client'

import { useState } from 'react'
import { Income } from '@/types'

interface IncomeTabProps {
  income: Income[]
  setIncome: (income: Income[]) => void
}

export default function IncomeTab({ income, setIncome }: IncomeTabProps) {
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const addIncome = () => {
    if (!source || !amount || parseFloat(amount) <= 0) {
      alert('Please fill in all fields with valid values')
      return
    }

    const newIncome: Income = {
      id: Date.now(),
      source,
      amount: parseFloat(amount),
      date
    }

    setIncome([newIncome, ...income])
    
    setSource('')
    setAmount('')
    setDate(new Date().toISOString().split('T')[0])
  }

  const deleteIncome = (id: number) => {
    setIncome(income.filter(inc => inc.id !== id))
  }

  return (
    <div className="dashboard">
      <div className="card">
        <div className="card-header">
          <span className="card-title">Add Income</span>
          <span className="card-icon">💰</span>
        </div>
        
        <div className="input-group">
          <label>Source</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g., Part-time job, Allowance"
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
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={addIncome}>
          Add Income
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Income History</span>
          <span className="card-icon">📊</span>
        </div>
        
        {income.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💰</div>
            <p>No income yet</p>
            <p style={{ fontSize: '0.9em' }}>Add your income sources above</p>
          </div>
        ) : (
          <div>
            {income.map(inc => (
              <div key={inc.id} className="income-item">
                <div className="income-details">
                  <div style={{ fontWeight: '600', marginBottom: '5px' }}>{inc.source}</div>
                  <div style={{ color: '#b4b4b4', fontSize: '0.9em' }}>
                    {new Date(inc.date).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#10b981' }}>
                    +${inc.amount.toFixed(2)}
                  </div>
                  <button className="delete-btn" onClick={() => deleteIncome(inc.id)}>
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
