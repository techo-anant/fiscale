'use client'

import { useState, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Expense, Income, Goal, FixedCosts } from '@/types'
import QuickStats from '@/components/QuickStats'
import TabNavigation from '@/components/TabNavigation'
import DashboardTab from '@/components/DashboardTab'
import ExpensesTab from '@/components/ExpensesTab'
import IncomeTab from '@/components/IncomeTab'
import GoalsTab from '@/components/GoalsTab'
import TaxTab from '@/components/TaxTab'
import OSAPTab from '@/components/OSAPTab'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [expenses, setExpenses, expensesLoaded] = useLocalStorage<Expense[]>('expenses', [])
  const [income, setIncome, incomeLoaded] = useLocalStorage<Income[]>('income', [])
  const [goals, setGoals, goalsLoaded] = useLocalStorage<Goal[]>('goals', [])
  const [monthlyBudget, setMonthlyBudget, budgetLoaded] = useLocalStorage<number>('monthlyBudget', 0)
  const [fixedCosts, setFixedCosts, fixedCostsLoaded] = useLocalStorage<FixedCosts>('fixedCosts', {
    rent: 0,
    carInsurance: 0,
    groceries: 0,
    phone: 0,
    utilities: 0,
    other: 0
  })
  const [monthlyIncome, setMonthlyIncome, monthlyIncomeLoaded] = useLocalStorage<number>('monthlyIncome', 0)
  const [savingsPercent, setSavingsPercent, savingsPercentLoaded] = useLocalStorage<number>('savingsPercent', 15)

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0)
  const currentBalance = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0

  const isLoaded = expensesLoaded && incomeLoaded && goalsLoaded && budgetLoaded && 
                   fixedCostsLoaded && monthlyIncomeLoaded && savingsPercentLoaded

  if (!isLoaded) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', color: 'white', marginTop: '50px' }}>
          <div style={{ fontSize: '2em' }}>💰</div>
          <div>Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <h1>💰 StudentFinance</h1>
        <p>Your Smart Money Management Companion</p>
      </div>

      <QuickStats 
        currentBalance={currentBalance}
        totalExpenses={totalExpenses}
        totalIncome={totalIncome}
        savingsRate={savingsRate}
      />

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'dashboard' && (
        <DashboardTab
          fixedCosts={fixedCosts}
          setFixedCosts={setFixedCosts}
          monthlyIncome={monthlyIncome}
          setMonthlyIncome={setMonthlyIncome}
          savingsPercent={savingsPercent}
          setSavingsPercent={setSavingsPercent}
          monthlyBudget={monthlyBudget}
          setMonthlyBudget={setMonthlyBudget}
          expenses={expenses}
          totalExpenses={totalExpenses}
        />
      )}

      {activeTab === 'expenses' && (
        <ExpensesTab
          expenses={expenses}
          setExpenses={setExpenses}
        />
      )}

      {activeTab === 'income' && (
        <IncomeTab
          income={income}
          setIncome={setIncome}
        />
      )}

      {activeTab === 'goals' && (
        <GoalsTab
          goals={goals}
          setGoals={setGoals}
        />
      )}

      {activeTab === 'tax' && <TaxTab />}

      {activeTab === 'osap' && <OSAPTab />}
    </div>
  )
}
