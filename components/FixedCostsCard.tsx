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
        <span className="card-title">Monthly Fixed Costs 🏠</span>
        <span className="card-icon">📌</span>
      </div>
      <div style={{ background: 'rgba(79, 209, 197, 0.1)', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #4fd1c5' }}>
        <strong style={{ color: '#4fd1c5' }}>💡 Pro Tip:</strong>
        <div style={{ color: '#b4b4b4', marginTop: '5px', fontSize: '0.95em' }}>
          Set your fixed costs so we can calculate how much you have left to spend!
        </div>
      </div>

      <div className="input-group">
        <label>🏠 Monthly Rent</label>
        <input
          type="number"
          value={fixedCosts.rent || ''}
          onChange={(e) => updateFixedCost('rent', e.target.value)}
          placeholder="e.g., 800"
          step="50"
        />
      </div>

      <div className="input-group">
        <label>🚗 Car Insurance (Monthly)</label>
        <input
          type="number"
          value={fixedCosts.carInsurance || ''}
          onChange={(e) => updateFixedCost('carInsurance', e.target.value)}
          placeholder="e.g., 200"
          step="10"
        />
      </div>

      <div className="input-group">
        <label>🛒 Groceries (Monthly)</label>
        <input
          type="number"
          value={fixedCosts.groceries || ''}
          onChange={(e) => updateFixedCost('groceries', e.target.value)}
          placeholder="e.g., 300"
          step="25"
        />
      </div>

      <div className="input-group">
        <label>📱 Phone Bill</label>
        <input
          type="number"
          value={fixedCosts.phone || ''}
          onChange={(e) => updateFixedCost('phone', e.target.value)}
          placeholder="e.g., 50"
          step="5"
        />
      </div>

      <div className="input-group">
        <label>💡 Utilities (Hydro, Internet, etc.)</label>
        <input
          type="number"
          value={fixedCosts.utilities || ''}
          onChange={(e) => updateFixedCost('utilities', e.target.value)}
          placeholder="e.g., 100"
          step="10"
        />
      </div>

      <div className="input-group">
        <label>➕ Other Fixed Costs</label>
        <input
          type="number"
          value={fixedCosts.other || ''}
          onChange={(e) => updateFixedCost('other', e.target.value)}
          placeholder="e.g., 50"
          step="10"
        />
      </div>

      <div className="stat-row" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444', marginTop: '20px' }}>
        <span className="stat-label" style={{ fontWeight: 'bold', fontSize: '1.1em' }}>Total Fixed Costs</span>
        <span className="stat-value" style={{ fontSize: '1.3em', color: '#ef4444' }}>
          ${totalFixedCosts.toFixed(2)}
        </span>
      </div>
    </div>
  )
}
