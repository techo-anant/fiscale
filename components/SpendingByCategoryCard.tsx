'use client'

import { Expense } from '@/types'

interface SpendingByCategoryCardProps {
  expenses: Expense[]
  totalExpenses: number
}

export default function SpendingByCategoryCard({
  expenses,
  totalExpenses
}: SpendingByCategoryCardProps) {
  // Calculate category breakdown
  const categoryTotals: { [key: string]: number } = {}
  expenses.forEach(exp => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount
  })

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Spending by Category</span>
        <span className="card-icon">🏷️</span>
      </div>

      {Object.keys(categoryTotals).length > 0 ? (
        <div>
          {Object.entries(categoryTotals).map(([category, amount]) => {
            const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
            return (
              <div key={category} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: '#ffffff' }}>{category}</span>
                  <span style={{ color: '#4fd1c5', fontWeight: 'bold' }}>${amount.toFixed(2)}</span>
                </div>
                <div className="progress-bar" style={{ height: '10px' }}>
                  <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <p>No expenses yet</p>
          <p style={{ fontSize: '0.9em' }}>Add expenses to see category breakdown</p>
        </div>
      )}
    </div>
  )
}
