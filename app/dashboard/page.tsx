'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
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

  // Read tab from URL
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['dashboard', 'expenses', 'income', 'goals', 'tax', 'osap'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.push(`/dashboard?tab=${tab}`)
  }

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0)
  const currentBalance = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0

  const isLoaded = expensesLoaded && incomeLoaded && goalsLoaded && budgetLoaded && 
                   fixedCostsLoaded && monthlyIncomeLoaded && savingsPercentLoaded

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-icon">💰</div>
          <div className="loading-text">Loading your financial data...</div>
        </div>
      </div>
    )
  }

  const userName = localStorage.getItem('userName')

  return (
    <div className="app-container">
      <div className="page-header">
        <h1 className="page-title">
          {userName ? `Welcome back, ${userName}` : 'Your Financial Dashboard'}
        </h1>
        <p className="page-subtitle">Track your finances and reach your goals</p>
      </div>

      <QuickStats 
        currentBalance={currentBalance}
        totalExpenses={totalExpenses}
        totalIncome={totalIncome}
        savingsRate={savingsRate}
      />

  
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