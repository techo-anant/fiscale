'use client'

import ScrollFadeIn from '@/components/ScrollFadeIn'

interface QuickStatsProps {
  currentBalance: number
  totalExpenses: number
  totalIncome: number
  savingsRate: number
}

export default function QuickStats({ currentBalance, totalExpenses, totalIncome, savingsRate }: QuickStatsProps) {
  return (
    <div className="quick-stats">
      <ScrollFadeIn delay={0} direction="up">
        <div className="quick-stat-card">
          <div className="quick-stat-value" style={{ color: currentBalance >= 0 ? '#9b6bff' : '#ff6b6b' }}>
            ${currentBalance.toFixed(2)}
          </div>
          <div className="quick-stat-label">Current Balance</div>
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn delay={0.1} direction="up">
        <div className="quick-stat-card">
          <div className="quick-stat-value expense-negative">
            ${totalExpenses.toFixed(2)}
          </div>
          <div className="quick-stat-label">This Month</div>
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn delay={0.2} direction="up">
        <div className="quick-stat-card">
          <div className="quick-stat-value" style={{ color: '#00d4aa' }}>
            ${totalIncome.toFixed(2)}
          </div>
          <div className="quick-stat-label">Total Income</div>
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn delay={0.3} direction="up">
        <div className="quick-stat-card">
          <div className="quick-stat-value" style={{ color: '#9b6bff' }}>{savingsRate.toFixed(1)}%</div>
          <div className="quick-stat-label">Savings Rate</div>
        </div>
      </ScrollFadeIn>
    </div>
  )
}
