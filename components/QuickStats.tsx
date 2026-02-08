interface QuickStatsProps {
  currentBalance: number
  totalExpenses: number
  totalIncome: number
  savingsRate: number
}

export default function QuickStats({ currentBalance, totalExpenses, totalIncome, savingsRate }: QuickStatsProps) {
  return (
    <div className="quick-stats">
      <div className="quick-stat-card">
        <div className="quick-stat-value" style={{ color: currentBalance >= 0 ? '#4fd1c5' : '#ef4444' }}>
          ${currentBalance.toFixed(2)}
        </div>
        <div className="quick-stat-label">Current Balance</div>
      </div>
      <div className="quick-stat-card">
        <div className="quick-stat-value expense-negative">
          ${totalExpenses.toFixed(2)}
        </div>
        <div className="quick-stat-label">This Month</div>
      </div>
      <div className="quick-stat-card">
        <div className="quick-stat-value expense-positive">
          ${totalIncome.toFixed(2)}
        </div>
        <div className="quick-stat-label">Total Income</div>
      </div>
      <div className="quick-stat-card">
        <div className="quick-stat-value">{savingsRate.toFixed(1)}%</div>
        <div className="quick-stat-label">Savings Rate</div>
      </div>
    </div>
  )
}
