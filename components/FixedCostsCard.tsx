'use client'

import { FixedCosts } from '@/types'

interface FixedCostsCardProps {
  fixedCosts: FixedCosts
  setFixedCosts: (costs: FixedCosts) => void
}

export default function FixedCostsCard({
  fixedCosts,
  setFixedCosts
}: FixedCostsCardProps) {
  const totalFixedCosts = Object.values(fixedCosts).reduce((sum, val) => sum + val, 0)

  const updateFixedCost = (field: keyof FixedCosts, value: string) => {
    setFixedCosts({
      ...fixedCosts,
      [field]: parseFloat(value) || 0
    })
  }

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Monthly Fixed Costs</span>
        <span className="card-icon">📌</span>
      </div>

      <div style={{
        background: 'var(--background-light)',
        padding: '16px',
        borderRadius: 'var(--radius-sm)',
        marginBottom: '24px',
        border: '1px solid var(--border)'
      }}>
        <strong style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '14px' }}>💡 Pro Tip</strong>
        <div style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '13px', lineHeight: '1.5' }}>
          Enter your recurring monthly expenses to calculate how much you can spend each month.
        </div>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        <div className="input-group">
          <label>Monthly Rent</label>
          <input
            type="number"
            value={fixedCosts.rent || ''}
            onChange={(e) => updateFixedCost('rent', e.target.value)}
            placeholder="e.g., 800"
            step="50"
          />
        </div>

        <div className="input-group">
          <label>Car Insurance (Monthly)</label>
          <input
            type="number"
            value={fixedCosts.carInsurance || ''}
            onChange={(e) => updateFixedCost('carInsurance', e.target.value)}
            placeholder="e.g., 200"
            step="10"
          />
        </div>

        <div className="input-group">
          <label>Groceries (Monthly)</label>
          <input
            type="number"
            value={fixedCosts.groceries || ''}
            onChange={(e) => updateFixedCost('groceries', e.target.value)}
            placeholder="e.g., 300"
            step="25"
          />
        </div>

        <div className="input-group">
          <label>Phone Bill</label>
          <input
            type="number"
            value={fixedCosts.phone || ''}
            onChange={(e) => updateFixedCost('phone', e.target.value)}
            placeholder="e.g., 50"
            step="5"
          />
        </div>

        <div className="input-group">
          <label>Utilities (Hydro, Internet, etc.)</label>
          <input
            type="number"
            value={fixedCosts.utilities || ''}
            onChange={(e) => updateFixedCost('utilities', e.target.value)}
            placeholder="e.g., 100"
            step="10"
          />
        </div>

        <div className="input-group">
          <label>Other Fixed Costs</label>
          <input
            type="number"
            value={fixedCosts.other || ''}
            onChange={(e) => updateFixedCost('other', e.target.value)}
            placeholder="e.g., 50"
            step="10"
          />
        </div>
      </div>

      <div className="stat-row" style={{
        background: 'var(--surface)',
        border: '2px solid var(--danger)',
        marginTop: '24px',
        padding: '20px'
      }}>
        <span className="stat-label" style={{ fontWeight: '700', fontSize: '15px' }}>
          Total Fixed Costs
        </span>
        <span className="stat-value" style={{ fontSize: '24px', color: 'var(--danger)', fontFamily: "'Space Grotesk', sans-serif" }}>
          ${totalFixedCosts.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  )
}