'use client'

interface BudgetOverviewCardProps {
  monthlyBudget: number
  setMonthlyBudget: (budget: number) => void
  totalExpenses: number
}

export default function BudgetOverviewCard({
  monthlyBudget,
  setMonthlyBudget,
  totalExpenses
}: BudgetOverviewCardProps) {
  const remaining = monthlyBudget - totalExpenses
  const percentUsed = monthlyBudget > 0 ? (totalExpenses / monthlyBudget) * 100 : 0

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Budget Overview</span>
        <span className="card-icon">📈</span>
      </div>

      <div className="stat-row">
        <span className="stat-label">Monthly Budget</span>
        <span className="stat-value">${monthlyBudget.toFixed(2)}</span>
      </div>

      <div className="stat-row">
        <span className="stat-label">Spent This Month</span>
        <span className="stat-value expense-negative">${totalExpenses.toFixed(2)}</span>
      </div>

      <div className="stat-row">
        <span className="stat-label">Remaining</span>
        <span className={`stat-value ${remaining >= 0 ? 'expense-positive' : 'expense-negative'}`}>
          ${remaining.toFixed(2)}
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${Math.min(percentUsed, 100)}%`,
            background: percentUsed > 90 ? 'linear-gradient(90deg, #ef4444, #dc2626)' :
              percentUsed > 75 ? 'linear-gradient(90deg, #f59e0b, #d97706)' :
                'linear-gradient(90deg, #0ea5e9, #0284c7)'
          }}
        >
          {percentUsed.toFixed(0)}%
        </div>
      </div>

      <div className="input-group" style={{ marginTop: '24px' }}>
        <label>Set Monthly Budget</label>
        <input
          type="number"
          value={monthlyBudget || ''}
          onChange={(e) => setMonthlyBudget(parseFloat(e.target.value) || 0)}
          placeholder="Enter budget amount"
          step="50"
        />
      </div>

      {percentUsed > 90 && monthlyBudget > 0 && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          padding: '12px',
          borderRadius: 'var(--radius-sm)',
          marginTop: '12px',
          borderLeft: '4px solid var(--danger)',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: '1.5'
        }}>
          <strong style={{ color: 'var(--danger)' }}>⚠️ Budget Alert:</strong> You've used {percentUsed.toFixed(0)}% of your monthly budget!
        </div>
      )}
    </div>
  )
}