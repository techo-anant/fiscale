'use client'

import { useState } from 'react'
import { calculateOSAP } from '@/utils/calculations'
import { OSAPResults } from '@/types'

export default function OSAPTab() {
  const [status, setStatus] = useState('Single, Independent')
  const [period, setPeriod] = useState('8')
  const [income, setIncome] = useState('')
  const [parental, setParental] = useState('')
  const [tuition, setTuition] = useState('')
  const [books, setBooks] = useState('')
  const [living, setLiving] = useState('away')
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<OSAPResults | null>(null)

  const handleCalculate = () => {
    const incomeVal = parseFloat(income) || 0
    const parentalVal = parseFloat(parental) || 0
    const tuitionVal = parseFloat(tuition) || 0
    const booksVal = parseFloat(books) || 0
    const periodVal = parseInt(period)

    const osapResults = calculateOSAP(status, periodVal, incomeVal, parentalVal, tuitionVal, booksVal, living)
    setResults(osapResults)
    setShowResults(true)
  }

  return (
    <div className="dashboard">
      <div className="card">
        <div className="card-header">
          <span className="card-title">OSAP Estimator</span>
          <span className="card-icon">🎓</span>
        </div>
        
        <div className="input-group">
          <label>Student Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Single, Independent">Single, Independent</option>
            <option value="Married/Common-law">Married/Common-law</option>
            <option value="Living with Parents">Living with Parents</option>
            <option value="Single Parent">Single Parent</option>
          </select>
        </div>

        <div className="input-group">
          <label>Study Period Length</label>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="8">8 months (Full year)</option>
            <option value="4">4 months (One semester)</option>
            <option value="12">12 months (Extended)</option>
          </select>
        </div>

        <div className="input-group">
          <label>Annual Income ($)</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Your income"
            step="1000"
          />
        </div>

        <div className="input-group">
          <label>Parental Income (if dependent) ($)</label>
          <input
            type="number"
            value={parental}
            onChange={(e) => setParental(e.target.value)}
            placeholder="0"
            step="1000"
          />
        </div>

        <div className="input-group">
          <label>Tuition & Fees ($)</label>
          <input
            type="number"
            value={tuition}
            onChange={(e) => setTuition(e.target.value)}
            placeholder="e.g., 8000"
            step="500"
          />
        </div>

        <div className="input-group">
          <label>Books & Supplies ($)</label>
          <input
            type="number"
            value={books}
            onChange={(e) => setBooks(e.target.value)}
            placeholder="e.g., 1000"
            step="100"
          />
        </div>

        <div className="input-group">
          <label>Living Arrangement</label>
          <select value={living} onChange={(e) => setLiving(e.target.value)}>
            <option value="home">Living at home</option>
            <option value="away">Living away from home</option>
          </select>
        </div>

        <button className="btn btn-primary" onClick={handleCalculate}>
          Estimate OSAP
        </button>
      </div>

      {showResults && results && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">OSAP Estimate</span>
            <span className="card-icon">💰</span>
          </div>
          
          <div style={{ background: 'rgba(79, 209, 197, 0.1)', padding: '20px', borderRadius: '10px', marginBottom: '20px', border: '2px solid #4fd1c5' }}>
            <div style={{ fontSize: '1.1em', color: '#b4b4b4', marginBottom: '10px' }}>
              Estimated Total OSAP
            </div>
            <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#4fd1c5' }}>
              ${results.osapEligible.toFixed(2)}
            </div>
            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                <span style={{ color: '#10b981' }}>💚 Grants (Don&apos;t Repay)</span>
                <span style={{ fontWeight: 'bold', color: '#10b981', fontSize: '1.2em' }}>
                  ${results.grantPortion.toFixed(2)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                <span style={{ color: '#fbbf24' }}>💛 Loans (Repay)</span>
                <span style={{ fontWeight: 'bold', color: '#fbbf24', fontSize: '1.2em' }}>
                  ${results.loanPortion.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="stat-row">
            <span className="stat-label">Total Educational Costs</span>
            <span className="stat-value">${results.totalCosts.toFixed(2)}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label" style={{ paddingLeft: '15px' }}>• Tuition & Fees</span>
            <span className="stat-value">${results.tuition.toFixed(2)}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label" style={{ paddingLeft: '15px' }}>• Books & Supplies</span>
            <span className="stat-value">${results.books.toFixed(2)}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label" style={{ paddingLeft: '15px' }}>
              • Living Costs ({results.period} months)
            </span>
            <span className="stat-value">${results.livingCosts.toFixed(2)}</span>
          </div>
          
          <div className="stat-row" style={{ marginTop: '15px' }}>
            <span className="stat-label">Your Resources</span>
            <span className="stat-value expense-negative">-${results.totalResources.toFixed(2)}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label" style={{ paddingLeft: '15px' }}>• Student Contribution</span>
            <span className="stat-value">${results.studentContribution.toFixed(2)}</span>
          </div>
          {results.parentalContribution > 0 && (
            <div className="stat-row">
              <span className="stat-label" style={{ paddingLeft: '15px' }}>• Parental Contribution</span>
              <span className="stat-value">${results.parentalContribution.toFixed(2)}</span>
            </div>
          )}

          <div className="insights" style={{ marginTop: '20px' }}>
            <div className="insight-item">
              📅 <strong>Payment Schedule:</strong> Funds disbursed at start of each term
            </div>
            <div className="insight-item">
              🎓 <strong>Graduation:</strong> 6-month grace period before repayment starts
            </div>
            <div className="insight-item">
              💰 <strong>Repayment:</strong> ~${(results.loanPortion * 0.05 / 12).toFixed(2)}/month estimated (10-year plan)
            </div>
            <div className="insight-item">
              ⚠️ <strong>Note:</strong> This is an estimate. Apply at ontario.ca/osap for official assessment
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <span className="card-title">OSAP Knowledge Base</span>
          <span className="card-icon">📚</span>
        </div>
        <div className="insights">
          <div style={{ fontWeight: 'bold', fontSize: '1.2em', marginBottom: '15px' }}>📖 Essential OSAP Info</div>
          
          <div className="insight-item">
            <strong>🗓️ Application Timeline</strong><br />
            Apply 60 days before your study period begins. OSAP opens in May for fall/winter studies.
          </div>
          
          <div className="insight-item">
            <strong>💵 Grant vs Loan</strong><br />
            Up to 60% of OSAP is grants (don&apos;t repay). The rest is loans (repay after graduation).
          </div>
          
          <div className="insight-item">
            <strong>📊 Eligibility</strong><br />
            • Canadian citizen/PR/protected person<br />
            • Ontario resident for 12 months<br />
            • Enrolled in approved program<br />
            • Pass credit check
          </div>
          
          <div className="insight-item">
            <strong>💰 Funding Limits (2024-25)</strong><br />
            • Single students: up to $18,020/year<br />
            • Married/dependent: up to $22,140/year<br />
            • Lifetime limit: 340 weeks for undergrad
          </div>
          
          <div className="insight-item">
            <strong>🎯 Repayment Grace Period</strong><br />
            You don&apos;t start repaying until 6 months after graduation. Interest-free during grace period!
          </div>
          
          <div className="insight-item">
            <strong>📝 Required Documents</strong><br />
            • Social Insurance Number<br />
            • Previous year&apos;s income tax info<br />
            • Parental income (if dependent)<br />
            • Bank account details
          </div>
          
          <div className="insight-item">
            <strong>🔄 RAP (Repayment Assistance)</strong><br />
            If you&apos;re struggling to repay, RAP can reduce/pause payments based on your income and family size.
          </div>
          
          <div className="insight-item">
            <strong>⚠️ Important Notes</strong><br />
            • Maintain 60% course load minimum<br />
            • Report income changes within 30 days<br />
            • Withdraw from courses? Must report immediately<br />
            • Keep grades up - academic probation affects funding
          </div>
          
          <div className="insight-item">
            <strong>🔗 Official Resources</strong><br />
            • Apply: ontario.ca/osap<br />
            • Support: 1-877-672-7001<br />
            • NSLSC (loans): csnpe-nslsc.canada.ca
          </div>
        </div>
      </div>
    </div>
  )
}
