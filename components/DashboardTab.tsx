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
  <div className="card loading" style={{
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '600' }}>
      Loading...
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
      {/* Available Funds Calculator - Full Width Priority */}
      <div className="card-full">
        <Suspense fallback={<CardSkeleton />}>
          <AvailableFundsCalculator
            fixedCosts={fixedCosts}
            monthlyIncome={monthlyIncome}
            setMonthlyIncome={setMonthlyIncome}
            savingsPercent={savingsPercent}
            setSavingsPercent={setSavingsPercent}
          />
        </Suspense>
      </div>

      {/* Fixed Costs Card - Medium */}
      <div className="card-medium">
        <Suspense fallback={<CardSkeleton />}>
          <FixedCostsCard
            fixedCosts={fixedCosts}
            setFixedCosts={setFixedCosts}
          />
        </Suspense>
      </div>

      {/* Right Column: Budget Overview + AI Insights - Medium */}
      <div className="card-medium" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Suspense fallback={<CardSkeleton />}>
          <BudgetOverviewCard
            monthlyBudget={monthlyBudget}
            setMonthlyBudget={setMonthlyBudget}
            totalExpenses={totalExpenses}
          />
        </Suspense>

        <div style={{ flex: 1, display: 'flex' }}>
          <Suspense fallback={<CardSkeleton />}>
            <div style={{ width: '100%' }}>
              <AIFinancialInsightsCard
                totalExpenses={totalExpenses}
                monthlyBudget={monthlyBudget}
                monthlyIncome={monthlyIncome}
                savingsPercent={savingsPercent}
                fixedCosts={fixedCosts}
              />
            </div>
          </Suspense>
        </div>
      </div>

      {/* Spending by Category - Full Width Below */}
      <div className="card-full">
        <Suspense fallback={<CardSkeleton />}>
          <SpendingByCategoryCard
            expenses={expenses}
            totalExpenses={totalExpenses}
          />
        </Suspense>
      </div>
    </div>
  )
}