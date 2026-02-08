'use client'

import { lazy, Suspense } from 'react'
import { FixedCosts, Expense } from '@/types'

// Lazy load components for better performance
const FixedCostsCard = lazy(() => import('./FixedCostsCard'))
const AvailableFundsCalculator = lazy(() => import('./AvailableFundsCalculator'))
const BudgetOverviewCard = lazy(() => import('./BudgetOverviewCard'))
const SpendingByCategoryCard = lazy(() => import('./SpendingByCategoryCard'))
const AIFinancialInsightsCard = lazy(() => import('./AIFinancialInsightsCard'))

interface DashboardTabProps {
  fixedCosts: FixedCosts
  setFixedCosts: (costs: FixedCosts) => void
  monthlyIncome: number
  setMonthlyIncome: (income: number) => void
  savingsPercent: number
  setSavingsPercent: (percent: number) => void
  monthlyBudget: number
  setMonthlyBudget: (budget: number) => void
  expenses: Expense[]
  totalExpenses: number
}

// Loading skeleton component
const CardSkeleton = () => (
  <div className="card" style={{ 
    background: 'rgba(255, 255, 255, 0.05)', 
    animation: 'pulse 1.5s ease-in-out infinite' 
  }}>
    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#4fd1c5', fontSize: '1.2em' }}>Loading...</div>
    </div>
  </div>
)

export default function DashboardTab({
  fixedCosts,
  setFixedCosts,
  monthlyIncome,
  setMonthlyIncome,
  savingsPercent,
  setSavingsPercent,
  monthlyBudget,
  setMonthlyBudget,
  expenses,
  totalExpenses
}: DashboardTabProps) {
  return (
    <div className="dashboard">
      {/* 1. Fixed Costs Card */}
      <Suspense fallback={<CardSkeleton />}>
        <FixedCostsCard
          fixedCosts={fixedCosts}
          setFixedCosts={setFixedCosts}
        />
      </Suspense>

      {/* 2. Available Funds Calculator */}
      <Suspense fallback={<CardSkeleton />}>
        <AvailableFundsCalculator
          fixedCosts={fixedCosts}
          monthlyIncome={monthlyIncome}
          setMonthlyIncome={setMonthlyIncome}
          savingsPercent={savingsPercent}
          setSavingsPercent={setSavingsPercent}
        />
      </Suspense>

      {/* 3. Budget Overview */}
      <Suspense fallback={<CardSkeleton />}>
        <BudgetOverviewCard
          monthlyBudget={monthlyBudget}
          setMonthlyBudget={setMonthlyBudget}
          totalExpenses={totalExpenses}
        />
      </Suspense>

      {/* 4. Spending by Category */}
      <Suspense fallback={<CardSkeleton />}>
        <SpendingByCategoryCard
          expenses={expenses}
          totalExpenses={totalExpenses}
        />
      </Suspense>

      {/* 5. AI Financial Insights */}
      <Suspense fallback={<CardSkeleton />}>
        <AIFinancialInsightsCard
          totalExpenses={totalExpenses}
          monthlyBudget={monthlyBudget}
          monthlyIncome={monthlyIncome}
          savingsPercent={savingsPercent}
          fixedCosts={fixedCosts}
        />
      </Suspense>
    </div>
  )
}