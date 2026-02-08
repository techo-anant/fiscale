'use client'

import { useState } from 'react'
import { Goal } from '@/types'

interface GoalsTabProps {
  goals: Goal[]
  setGoals: (goals: Goal[]) => void
}

export default function GoalsTab({ goals, setGoals }: GoalsTabProps) {
  const [name, setName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [currentAmount, setCurrentAmount] = useState('')
  const [targetDate, setTargetDate] = useState('')

  const addGoal = () => {
    if (!name || !targetAmount || parseFloat(targetAmount) <= 0) {
      alert('Please fill in all required fields')
      return
    }

    const newGoal: Goal = {
      id: Date.now(),
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount) || 0,
      targetDate
    }

    setGoals([...goals, newGoal])
    
    setName('')
    setTargetAmount('')
    setCurrentAmount('')
    setTargetDate('')
  }

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  return (
    <div className="dashboard">
      <div className="card">
        <div className="card-header">
          <span className="card-title">Create Savings Goal</span>
          <span className="card-icon">🎯</span>
        </div>
        
        <div className="input-group">
          <label>Goal Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., New Laptop, Spring Break"
          />
        </div>

        <div className="input-group">
          <label>Target Amount ($)</label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
          />
        </div>

        <div className="input-group">
          <label>Current Savings ($)</label>
          <input
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
          />
        </div>

        <div className="input-group">
          <label>Target Date</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={addGoal}>
          Create Goal
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Your Goals</span>
          <span className="card-icon">🏆</span>
        </div>
        
        {goals.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎯</div>
            <p>No goals yet</p>
            <p style={{ fontSize: '0.9em' }}>Create a savings goal above</p>
          </div>
        ) : (
          <div>
            {goals.map(goal => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100
              const remaining = goal.targetAmount - goal.currentAmount
              
              return (
                <div key={goal.id} className="goal-item">
                  <div className="goal-details" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ fontWeight: '600', fontSize: '1.1em' }}>{goal.name}</div>
                      <button className="delete-btn" onClick={() => deleteGoal(goal.id)}>
                        Delete
                      </button>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9em', color: '#b4b4b4' }}>
                      <span>${goal.currentAmount.toFixed(2)} saved</span>
                      <span>Goal: ${goal.targetAmount.toFixed(2)}</span>
                    </div>
                    
                    <div className="progress-bar" style={{ marginBottom: '10px' }}>
                      <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }}>
                        {progress.toFixed(0)}%
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em' }}>
                      <span style={{ color: remaining > 0 ? '#f59e0b' : '#10b981' }}>
                        {remaining > 0 ? `$${remaining.toFixed(2)} to go` : 'Goal reached! 🎉'}
                      </span>
                      {goal.targetDate && (
                        <span style={{ color: '#b4b4b4' }}>
                          By {new Date(goal.targetDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
