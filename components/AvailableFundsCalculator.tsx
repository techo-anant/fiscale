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
        <span className="card-title">Available Funds Calculator</span>
        <span className="card-icon">💰</span>
      </div>

      <div style={{ marginBottom: '28px' }}>
        {/* Main Available Funds Display */}
        <div style={{
          background: 'var(--background-light)',
          padding: '24px 28px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Available to spend
            </div>
            <div
              style={{
                fontSize: '42px',
                fontWeight: '700',
                color: availableToSpend >= 0 ? '#10b981' : '#ef4444',
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-1px',
                lineHeight: '1'
              }}
            >
              ${availableToSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', marginTop: '6px' }}>
              After fixed costs & savings
            </div>
          </div>

          {/* Quick breakdown on the right */}
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Income: </span>
              <span style={{ color: 'var(--success)', fontWeight: '600' }}>
                ${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fixed: </span>
              <span style={{ color: 'var(--danger)', fontWeight: '600' }}>
                -${totalFixedCosts.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
            {savingsAmount > 0 && (
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Savings: </span>
                <span style={{ color: 'var(--primary)', fontWeight: '600' }}>
                  -${savingsAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Alert message if needed */}
        {availableToSpend < 0 && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            marginTop: '12px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: 'var(--danger)' }}>⚠️</span>
            Your expenses exceed your income. Consider reducing costs or finding additional income.
          </div>
        )}
        {availableToSpend >= 0 && availableToSpend < 200 && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            marginTop: '12px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: 'var(--warning)' }}>💡</span>
            Less than $200 available. Budget carefully for essentials.
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label>Monthly Income (After Tax)</label>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Total monthly income from all sources
          </div>
          <input
            type="number"
            value={monthlyIncome || ''}
            onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
            placeholder="e.g., 2500"
            step="50"
          />
        </div>

        <div className="input-group" style={{ marginBottom: 0 }}>
          <label>Savings Goal (%)</label>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
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
      </div>

      {monthlyIncome > 0 && (
        <div style={{
          background: 'var(--background-light)',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <h3 style={{
            color: 'var(--text-primary)',
            marginBottom: '20px',
            fontSize: '16px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Detailed Breakdown
          </h3>

          <div style={{ margin: '20px 0' }}>
            <div style={{ color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Fixed Costs
            </div>
            {fixedCosts.rent > 0 && (
              <div className="stat-row" style={{ background: 'transparent', padding: '10px 0', margin: '6px 0' }}>
                <span className="stat-label" style={{ paddingLeft: '16px', fontSize: '14px' }}>Rent</span>
                <span className="stat-value expense-negative">-${fixedCosts.rent.toFixed(2)}</span>
              </div>
            )}
            {fixedCosts.carInsurance > 0 && (
              <div className="stat-row" style={{ background: 'transparent', padding: '10px 0', margin: '6px 0' }}>
                <span className="stat-label" style={{ paddingLeft: '16px', fontSize: '14px' }}>Car Insurance</span>
                <span className="stat-value expense-negative">-${fixedCosts.carInsurance.toFixed(2)}</span>
              </div>
            )}
            {fixedCosts.groceries > 0 && (
              <div className="stat-row" style={{ background: 'transparent', padding: '10px 0', margin: '6px 0' }}>
                <span className="stat-label" style={{ paddingLeft: '16px', fontSize: '14px' }}>Groceries</span>
                <span className="stat-value expense-negative">-${fixedCosts.groceries.toFixed(2)}</span>
              </div>
            )}
            {fixedCosts.phone > 0 && (
              <div className="stat-row" style={{ background: 'transparent', padding: '10px 0', margin: '6px 0' }}>
                <span className="stat-label" style={{ paddingLeft: '16px', fontSize: '14px' }}>Phone</span>
                <span className="stat-value expense-negative">-${fixedCosts.phone.toFixed(2)}</span>
              </div>
            )}
            {fixedCosts.utilities > 0 && (
              <div className="stat-row" style={{ background: 'transparent', padding: '10px 0', margin: '6px 0' }}>
                <span className="stat-label" style={{ paddingLeft: '16px', fontSize: '14px' }}>Utilities</span>
                <span className="stat-value expense-negative">-${fixedCosts.utilities.toFixed(2)}</span>
              </div>
            )}
            {fixedCosts.other > 0 && (
              <div className="stat-row" style={{ background: 'transparent', padding: '10px 0', margin: '6px 0' }}>
                <span className="stat-label" style={{ paddingLeft: '16px', fontSize: '14px' }}>Other</span>
                <span className="stat-value expense-negative">-${fixedCosts.other.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}