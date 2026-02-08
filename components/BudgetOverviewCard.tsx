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
        <span className="stat-value expense-positive">${remaining.toFixed(2)}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${Math.min(percentUsed, 100)}%` }}
        >
          {percentUsed.toFixed(0)}%
        </div>
      </div>

      <div className="input-group" style={{ marginTop: '20px' }}>
        <label>Set Monthly Budget</label>
        <input
          type="number"
          value={monthlyBudget || ''}
          onChange={(e) => setMonthlyBudget(parseFloat(e.target.value) || 0)}
          placeholder="Enter amount"
        />
      </div>
    </div>
  )
}
