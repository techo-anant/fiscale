'use client'

import { FixedCosts } from '@/types'

interface AvailableFundsCalculatorProps {
  fixedCosts: FixedCosts
  monthlyIncome: number
  setMonthlyIncome: (income: number) => void
  savingsPercent: number
  setSavingsPercent: (percent: number) => void
}

export default function AvailableFundsCalculator({
  fixedCosts,
  monthlyIncome,
  setMonthlyIncome,
  savingsPercent,
  setSavingsPercent
}: AvailableFundsCalculatorProps) {
  const totalFixedCosts = Object.values(fixedCosts).reduce((sum, val) => sum + val, 0)
  const savingsAmount = (monthlyIncome * savingsPercent) / 100
  const availableToSpend = monthlyIncome - totalFixedCosts - savingsAmount

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Available Funds Calculator 💰</span>
        <span className="card-icon">🧮</span>
      </div>
      
      <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '2px solid #10b981' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.95em', color: '#b4b4b4', marginBottom: '8px' }}>
            💵 Money You Can Spend This Month
          </div>
          <div 
            style={{ 
              fontSize: '2.8em', 
              fontWeight: 'bold', 
              color: availableToSpend >= 0 ? '#10b981' : '#ef4444' 
            }}
          >
            ${availableToSpend.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.9em', color: '#b4b4b4', marginTop: '10px' }}>
            After fixed costs & savings
          </div>
        </div>
      </div>

      <div className="input-group">
        <label>💵 Monthly Income (After Tax)</label>
        <div style={{ fontSize: '0.9em', color: '#b4b4b4', marginBottom: '8px' }}>
          Your total monthly income from all sources
        </div>
        <input
          type="number"
          value={monthlyIncome || ''}
          onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
          placeholder="e.g., 2500"
          step="50"
        />
      </div>

      <div className="input-group">
        <label>🎯 Savings Goal (% to save)</label>
        <div style={{ fontSize: '0.9em', color: '#b4b4b4', marginBottom: '8px' }}>
          Recommended: 10-20% of income
        </div>
        <select value={savingsPercent} onChange={(e) => setSavingsPercent(parseInt(e.target.value))}>
          <option value="0">0% - No savings</option>
          <option value="5">5% - Getting started</option>
          <option value="10">10% - Good habit</option>
          <option value="15">15% - Recommended</option>
          <option value="20">20% - Excellent!</option>
          <option value="25">25% - Aggressive saver</option>
          <option value="30">30% - Super saver!</option>
        </select>
      </div>

      {monthlyIncome > 0 && (
        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px', marginTop: '20px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h3 style={{ color: '#4fd1c5', marginBottom: '15px', fontSize: '1.1em' }}>📊 Monthly Breakdown</h3>
          
          <div className="stat-row">
            <span className="stat-label">💵 Monthly Income</span>
            <span className="stat-value expense-positive">+${monthlyIncome.toFixed(2)}</span>
          </div>

          <div style={{ height: '2px', background: 'rgba(255, 255, 255, 0.1)', margin: '15px 0' }}></div>

          <div style={{ margin: '15px 0' }}>
            <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: '10px' }}>💸 Fixed Costs</div>
            {fixedCosts.rent > 0 && (
              <div className="stat-row" style={{ background: 'transparent', padding: '8px 0' }}>
                <span className="stat-label" style={{ paddingLeft: '15px', fontSize: '0.95em' }}>🏠 Rent</span>
                <span className="stat-value expense-negative" style={{ fontSize: '0.95em' }}>
                  -${fixedCosts.rent.toFixed(2)}
                </span>
              </div>
            )}
            {fixedCosts.carInsurance > 0 && (
              <div className="stat-row" style={{ background: 'transparent', padding: '8px 0' }}>
                <span className="stat-label" style={{ paddingLeft: '15px', fontSize: '0.95em' }}>🚗 Car Insurance</span>
                <span className="stat-value expense-negative" style={{ fontSize: '0.95em' }}>
                  -${fixedCosts.carInsurance.toFixed(2)}
                </span>
              </div>
            )}
            {fixedCosts.groceries > 0 && (
              <div className="stat-row" style={{ background: 'transparent', padding: '8px 0' }}>
                <span className="stat-label" style={{ paddingLeft: '15px', fontSize: '0.95em' }}>🛒 Groceries</span>
                <span className="stat-value expense-negative" style={{ fontSize: '0.95em' }}>
                  -${fixedCosts.groceries.toFixed(2)}
                </span>
              </div>
            )}
            {fixedCosts.phone > 0 && (
              <div className="stat-row" style={{ background: 'transparent', padding: '8px 0' }}>
                <span className="stat-label" style={{ paddingLeft: '15px', fontSize: '0.95em' }}>📱 Phone</span>
                <span className="stat-value expense-negative" style={{ fontSize: '0.95em' }}>
                  -${fixedCosts.phone.toFixed(2)}
                </span>
              </div>
            )}
            {fixedCosts.utilities > 0 && (
              <div className="stat-row" style={{ background: 'transparent', padding: '8px 0' }}>
                <span className="stat-label" style={{ paddingLeft: '15px', fontSize: '0.95em' }}>💡 Utilities</span>
                <span className="stat-value expense-negative" style={{ fontSize: '0.95em' }}>
                  -${fixedCosts.utilities.toFixed(2)}
                </span>
              </div>
            )}
            {fixedCosts.other > 0 && (
              <div className="stat-row" style={{ background: 'transparent', padding: '8px 0' }}>
                <span className="stat-label" style={{ paddingLeft: '15px', fontSize: '0.95em' }}>➕ Other</span>
                <span className="stat-value expense-negative" style={{ fontSize: '0.95em' }}>
                  -${fixedCosts.other.toFixed(2)}
                </span>
              </div>
            )}
            <div className="stat-row" style={{ background: 'rgba(239, 68, 68, 0.1)', marginTop: '5px' }}>
              <span className="stat-label" style={{ fontWeight: 'bold' }}>Total Fixed Costs</span>
              <span className="stat-value expense-negative" style={{ fontSize: '1.1em' }}>
                -${totalFixedCosts.toFixed(2)}
              </span>
            </div>
          </div>

          {savingsAmount > 0 && (
            <div className="stat-row">
              <span className="stat-label">🎯 Savings ({savingsPercent}%)</span>
              <span className="stat-value expense-negative">-${savingsAmount.toFixed(2)}</span>
            </div>
          )}

          <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #4fd1c5, transparent)', margin: '20px 0' }}></div>

          <div className="stat-row" style={{ 
            background: availableToSpend >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
            border: `2px solid ${availableToSpend >= 0 ? '#10b981' : '#ef4444'}`,
            padding: '15px'
          }}>
            <span className="stat-label" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
              💰 Available to Spend
            </span>
            <span className="stat-value" style={{ 
              fontSize: '1.5em', 
              color: availableToSpend >= 0 ? '#10b981' : '#ef4444' 
            }}>
              ${availableToSpend.toFixed(2)}
            </span>
          </div>

          {availableToSpend < 0 ? (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '15px', borderRadius: '8px', marginTop: '15px', borderLeft: '4px solid #ef4444' }}>
              <strong style={{ color: '#ef4444' }}>⚠️ Warning:</strong>
              <div style={{ color: '#b4b4b4', marginTop: '5px', fontSize: '0.95em' }}>
                Your expenses are higher than your income! Try reducing fixed costs, lowering your savings goal temporarily, or finding ways to increase income.
              </div>
            </div>
          ) : availableToSpend < 200 ? (
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '15px', borderRadius: '8px', marginTop: '15px', borderLeft: '4px solid #f59e0b' }}>
              <strong style={{ color: '#f59e0b' }}>💡 Heads Up:</strong>
              <div style={{ color: '#b4b4b4', marginTop: '5px', fontSize: '0.95em' }}>
                You have less than $200 to spend this month. Budget carefully for food, entertainment, and emergencies!
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '15px', borderRadius: '8px', marginTop: '15px', borderLeft: '4px solid #10b981' }}>
              <strong style={{ color: '#10b981' }}>✅ Great Job!</strong>
              <div style={{ color: '#b4b4b4', marginTop: '5px', fontSize: '0.95em' }}>
                You have ${availableToSpend.toFixed(2)} available for food, entertainment, shopping, and emergencies. Keep track of your spending!
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
