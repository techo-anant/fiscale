'use client'

import { useState } from 'react'
import { calculateCanadianTax } from '@/utils/taxCalculations'
import { TaxResults } from '@/types'

export default function TaxTab() {
  const [province, setProvince] = useState('ON')
  const [t4Box14, setT4Box14] = useState('')
  const [t4Box22, setT4Box22] = useState('')
  const [t4Box16, setT4Box16] = useState('')
  const [t4Box18, setT4Box18] = useState('')
  const [t2202BoxA, setT2202BoxA] = useState('')
  const [studyMonths, setStudyMonths] = useState('8')
  const [otherIncome, setOtherIncome] = useState('')
  const [claimTextbooks, setClaimTextbooks] = useState('yes')
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<TaxResults | null>(null)

  const provinces = [
    { code: 'ON', name: 'Ontario' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'AB', name: 'Alberta' },
    { code: 'QC', name: 'Quebec' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland & Labrador' },
    { code: 'PE', name: 'Prince Edward Island' }
  ]

  const handleCalculate = () => {
    const income = parseFloat(t4Box14) || 0
    const taxDeducted = parseFloat(t4Box22) || 0
    const tuitionFees = parseFloat(t2202BoxA) || 0
    const months = parseInt(studyMonths) || 0
    const cpp = parseFloat(t4Box16) || 0
    const ei = parseFloat(t4Box18) || 0
    const other = parseFloat(otherIncome) || 0

    if (income <= 0) {
      alert('Please enter your employment income (Box 14)')
      return
    }

    const taxResults = calculateCanadianTax(province, income, taxDeducted, tuitionFees, months, cpp, ei, other)
    setResults(taxResults)
    setShowResults(true)
  }

  return (
    <div className="dashboard">
      <div className="card">
        <div className="card-header">
          <span className="card-title">Simple Student Tax Calculator</span>
          <span className="card-icon">🧮</span>
        </div>

        <div style={{ background: 'rgba(79, 209, 197, 0.1)', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #4fd1c5' }}>
          <strong style={{ color: '#4fd1c5' }}>📋 What you need:</strong>
          <div style={{ color: '#b4b4b4', marginTop: '5px' }}>
            Your T4 slip from work + T2202 from school. Don&apos;t have them? Just enter the numbers you know!
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '25px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h3 style={{ color: '#4fd1c5', marginBottom: '15px', fontSize: '1.2em' }}>📄 Part 1: Your T4 Information</h3>
          <p style={{ color: '#b4b4b4', fontSize: '0.95em', marginBottom: '20px' }}>
            Your T4 is the tax form from your employer. Find these boxes on your T4 slip:
          </p>
          
          <div className="input-group">
            <label>Box 14 - Employment Income 💼</label>
            <div style={{ fontSize: '0.9em', color: '#b4b4b4', marginBottom: '8px' }}>
              This is your total earnings from your job
            </div>
            <input
              type="number"
              value={t4Box14}
              onChange={(e) => setT4Box14(e.target.value)}
              placeholder="e.g., 15000"
              step="0.01"
            />
          </div>

          <div className="input-group">
            <label>Box 22 - Income Tax Deducted 💰</label>
            <div style={{ fontSize: '0.9em', color: '#b4b4b4', marginBottom: '8px' }}>
              Tax your employer already took off your paycheques
            </div>
            <input
              type="number"
              value={t4Box22}
              onChange={(e) => setT4Box22(e.target.value)}
              placeholder="e.g., 2500"
              step="0.01"
            />
          </div>

          <div className="input-group">
            <label>Box 16 - CPP Contributions 🏦</label>
            <div style={{ fontSize: '0.9em', color: '#b4b4b4', marginBottom: '8px' }}>
              Canada Pension Plan deducted (you get this back as a credit!)
            </div>
            <input
              type="number"
              value={t4Box16}
              onChange={(e) => setT4Box16(e.target.value)}
              placeholder="e.g., 850"
              step="0.01"
            />
          </div>

          <div className="input-group">
            <label>Box 18 - EI Premiums 🛡️</label>
            <div style={{ fontSize: '0.9em', color: '#b4b4b4', marginBottom: '8px' }}>
              Employment Insurance deducted (you get this back too!)
            </div>
            <input
              type="number"
              value={t4Box18}
              onChange={(e) => setT4Box18(e.target.value)}
              placeholder="e.g., 240"
              step="0.01"
            />
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '25px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h3 style={{ color: '#4fd1c5', marginBottom: '15px', fontSize: '1.2em' }}>🎓 Part 2: Your T2202 (Tuition)</h3>
          <p style={{ color: '#b4b4b4', fontSize: '0.95em', marginBottom: '20px' }}>
            Your T2202 shows your tuition. Get it from your school portal:
          </p>
          
          <div className="input-group">
            <label>Box A - Tuition Fees Paid 📚</label>
            <div style={{ fontSize: '0.9em', color: '#b4b4b4', marginBottom: '8px' }}>
              Total tuition you paid this year
            </div>
            <input
              type="number"
              value={t2202BoxA}
              onChange={(e) => setT2202BoxA(e.target.value)}
              placeholder="e.g., 8000"
              step="0.01"
            />
          </div>

          <div className="input-group">
            <label>Number of Months in School 📅</label>
            <div style={{ fontSize: '0.9em', color: '#b4b4b4', marginBottom: '8px' }}>
              How many months were you a full-time student? (Sept-April = 8 months)
            </div>
            <select value={studyMonths} onChange={(e) => setStudyMonths(e.target.value)}>
              <option value="0">0 months</option>
              <option value="4">4 months (1 semester)</option>
              <option value="8">8 months (full year)</option>
              <option value="12">12 months</option>
            </select>
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '25px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h3 style={{ color: '#4fd1c5', marginBottom: '15px', fontSize: '1.2em' }}>🏠 Part 3: Other Info</h3>
          
          <div className="input-group">
            <label>What Province Do You Live In? 🗺️</label>
            <select value={province} onChange={(e) => setProvince(e.target.value)}>
              {provinces.map(prov => (
                <option key={prov.code} value={prov.code}>{prov.name}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Any Other Income? 💵</label>
            <div style={{ fontSize: '0.9em', color: '#b4b4b4', marginBottom: '8px' }}>
              Tips, freelance work, scholarships over $500, etc.
            </div>
            <input
              type="number"
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
              placeholder="0"
              step="0.01"
            />
          </div>

          <div className="input-group">
            <label>Did You Pay For Textbooks? 📖</label>
            <div style={{ fontSize: '0.9em', color: '#b4b4b4', marginBottom: '8px' }}>
              You can claim $65 per month as a student!
            </div>
            <select value={claimTextbooks} onChange={(e) => setClaimTextbooks(e.target.value)}>
              <option value="yes">Yes, claim textbook amount</option>
              <option value="no">No, skip this</option>
            </select>
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleCalculate}
          style={{ fontSize: '1.1em', padding: '15px' }}
        >
          🧮 Calculate My Tax Refund!
        </button>
      </div>

      {showResults && results && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Your Tax Results! 🎉</span>
            <span className="card-icon">📊</span>
          </div>

          <div style={{ background: 'rgba(79, 209, 197, 0.1)', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '2px solid #4fd1c5' }}>
            <h3 style={{ color: '#4fd1c5', marginBottom: '15px' }}>💰 Tax Calculation Results</h3>
            
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
              <h3 style={{ color: '#4fd1c5', marginBottom: '15px' }}>💼 Income Breakdown</h3>
              <div className="stat-row">
                <span className="stat-label">Employment Income (Box 14)</span>
                <span className="stat-value">${results.income.toFixed(2)}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Basic Personal Amount</span>
                <span className="stat-value expense-positive">-${results.basicPersonalAmount.toFixed(2)}</span>
              </div>
              <div className="stat-row" style={{ background: 'rgba(239, 184, 16, 0.1)', marginTop: '10px' }}>
                <span className="stat-label" style={{ fontWeight: 'bold' }}>Taxable Income</span>
                <span className="stat-value" style={{ fontSize: '1.2em' }}>${results.taxableIncome.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
              <h3 style={{ color: '#4fd1c5', marginBottom: '15px' }}>🍁 Federal Tax</h3>
              <div className="stat-row">
                <span className="stat-label">Tax on Income</span>
                <span className="stat-value">${results.federalTax.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
              <h3 style={{ color: '#4fd1c5', marginBottom: '15px' }}>🏛️ Provincial Tax ({province})</h3>
              <div className="stat-row">
                <span className="stat-label">Tax on Income</span>
                <span className="stat-value">${results.provincialTax.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
              <h3 style={{ color: '#4fd1c5', marginBottom: '15px' }}>🎁 Tax Credits (Reduce Tax Owed)</h3>
              <div className="stat-row" style={{ background: 'transparent' }}>
                <span className="stat-label">💳 Basic Personal Credit</span>
                <span className="stat-value expense-positive">-${results.basicPersonalCredit.toFixed(2)}</span>
              </div>
              {results.tuitionCredit > 0 && (
                <div className="stat-row" style={{ background: 'transparent' }}>
                  <span className="stat-label">🎓 Tuition Credit</span>
                  <span className="stat-value expense-positive">-${results.tuitionCredit.toFixed(2)}</span>
                </div>
              )}
              {results.educationAmount > 0 && (
                <div className="stat-row" style={{ background: 'transparent' }}>
                  <span className="stat-label">📚 Education Amount ({results.studyMonths} months)</span>
                  <span className="stat-value expense-positive">-${results.educationAmount.toFixed(2)}</span>
                </div>
              )}
              {results.textbookAmount > 0 && claimTextbooks === 'yes' && (
                <div className="stat-row" style={{ background: 'transparent' }}>
                  <span className="stat-label">📖 Textbook Amount</span>
                  <span className="stat-value expense-positive">-${results.textbookAmount.toFixed(2)}</span>
                </div>
              )}
              {results.cppCredit > 0 && (
                <div className="stat-row" style={{ background: 'transparent' }}>
                  <span className="stat-label">🏦 CPP Credit (Box 16)</span>
                  <span className="stat-value expense-positive">-${results.cppCredit.toFixed(2)}</span>
                </div>
              )}
              {results.eiCredit > 0 && (
                <div className="stat-row" style={{ background: 'transparent' }}>
                  <span className="stat-label">🛡️ EI Credit (Box 18)</span>
                  <span className="stat-value expense-positive">-${results.eiCredit.toFixed(2)}</span>
                </div>
              )}
              <div className="stat-row" style={{ background: 'rgba(16, 185, 129, 0.2)', marginTop: '10px' }}>
                <span className="stat-label" style={{ fontWeight: 'bold' }}>Total Credits</span>
                <span className="stat-value" style={{ color: '#10b981', fontSize: '1.2em' }}>
                  -${results.totalCredits.toFixed(2)}
                </span>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
              <h3 style={{ color: '#4fd1c5', marginBottom: '15px' }}>🧮 Final Calculation</h3>
              <div className="stat-row">
                <span className="stat-label">Tax You Actually Owe</span>
                <span className="stat-value">${results.totalTaxOwed.toFixed(2)}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Tax Already Paid (Box 22)</span>
                <span className="stat-value expense-positive">-${results.taxDeducted.toFixed(2)}</span>
              </div>
              <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #4fd1c5, transparent)', margin: '15px 0' }}></div>
              <div className="stat-row" style={{ background: 'rgba(79, 209, 197, 0.1)', border: '2px solid #4fd1c5' }}>
                <span className="stat-label" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                  {results.refundOrOwing >= 0 ? '💰 Your Refund' : '⚠️ You Owe'}
                </span>
                <span className="stat-value" style={{ 
                  fontSize: '1.5em', 
                  color: results.refundOrOwing >= 0 ? '#10b981' : '#f59e0b' 
                }}>
                  {results.refundOrOwing >= 0 ? '+' : ''}${Math.abs(results.refundOrOwing).toFixed(2)}
                </span>
              </div>
            </div>

            {results.unusedTuition > 0 && (
              <div style={{ background: 'rgba(79, 209, 197, 0.1)', padding: '20px', borderRadius: '12px', border: '2px solid #4fd1c5' }}>
                <h3 style={{ color: '#4fd1c5', marginBottom: '10px' }}>🎁 Bonus: Unused Tuition Credits</h3>
                <div style={{ fontSize: '1.1em', margin: '10px 0' }}>
                  <strong style={{ color: '#10b981', fontSize: '1.3em' }}>${results.unusedTuition.toFixed(2)}</strong> in credits
                </div>
                <div style={{ color: '#b4b4b4', fontSize: '0.95em', lineHeight: '1.5' }}>
                  You didn&apos;t need all your tuition credits this year! These automatically carry forward to reduce your taxes in future years when you&apos;re earning more. It&apos;s like free money waiting for you! 🎉
                </div>
              </div>
            )}
          </div>

          <div className="insights" style={{ marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2em', marginBottom: '15px' }}>💡 Student Tax Tips</div>
            <div className="insight-item">
              <strong>✅ Keep Your Documents:</strong> Save your T4 from work and T2202 from school for 6 years
            </div>
            <div className="insight-item">
              <strong>✅ Unused Tuition:</strong> If you don&apos;t use all your tuition credits, they roll over to next year!
            </div>
            <div className="insight-item">
              <strong>✅ File Even at $0:</strong> File your taxes even if you earned nothing - it helps with GST credits & builds RRSP room
            </div>
            <div className="insight-item">
              <strong>✅ Free Filing:</strong> Use free tax software like WealthSimple Tax or UFile Student (both are free for students!)
            </div>
            <div className="insight-item">
              <strong>✅ Deadline:</strong> File by April 30th! Late = no refund for months 😢
            </div>
            <div className="insight-item">
              <strong>📞 Need Help?</strong> CRA has a student tax line: 1-800-959-8281
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
