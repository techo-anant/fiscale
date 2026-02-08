'use client'

import { FixedCosts } from '@/types'

interface AIFinancialInsightsCardProps {
  totalExpenses: number
  monthlyBudget: number
  monthlyIncome: number
  savingsPercent: number
  fixedCosts: FixedCosts
}

export default function AIFinancialInsightsCard({
  totalExpenses,
  monthlyBudget,
  monthlyIncome,
  savingsPercent,
  fixedCosts
}: AIFinancialInsightsCardProps) {
  const percentUsed = monthlyBudget > 0 ? (totalExpenses / monthlyBudget) * 100 : 0
  const totalFixedCosts = Object.values(fixedCosts).reduce((sum, val) => sum + val, 0)
  const savingsAmount = (monthlyIncome * savingsPercent) / 100
  const availableToSpend = monthlyIncome - totalFixedCosts - savingsAmount
  const savingsRate = monthlyIncome > 0 ? (savingsAmount / monthlyIncome) * 100 : 0

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">AI Financial Insights</span>
        <span className="card-icon">🤖</span>
      </div>
      <div className="insights">
        {totalExpenses === 0 ? (
          <div className="insight-item">💡 Track your expenses to get personalized insights!</div>
        ) : (
          <>
            {percentUsed > 90 && (
              <div className="insight-item">⚠️ You've used {percentUsed.toFixed(0)}% of your budget. Consider reducing spending for the rest of the month.</div>
            )}
            {savingsRate > 20 && (
              <div className="insight-item">🎉 Great job! You're saving {savingsRate.toFixed(1)}% of your income!</div>
            )}
            {totalFixedCosts > monthlyIncome * 0.5 && monthlyIncome > 0 && (
              <div className="insight-item">💡 Your fixed costs are {((totalFixedCosts/monthlyIncome)*100).toFixed(0)}% of your income. Try to keep this under 50%.</div>
            )}
            {availableToSpend < 0 && (
              <div className="insight-item">⚠️ You're spending more than you earn. Review your fixed costs and look for ways to increase income.</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
