import { OSAPResults } from '@/types'

export function calculateOSAP(
  status: string,
  period: number,
  income: number,
  parental: number,
  tuition: number,
  books: number,
  living: string
): OSAPResults {
  let livingCosts = living === 'away' ? (period * 600) : (period * 200)
  const totalCosts = tuition + books + livingCosts

  let studentContribution = Math.max(0, income - 7500)
  let parentalContribution = 0
  
  if (status === 'dependent' || status === 'Living with Parents') {
    if (parental <= 40000) {
      parentalContribution = 0
    } else if (parental <= 80000) {
      parentalContribution = (parental - 40000) * 0.05
    } else {
      parentalContribution = 2000 + (parental - 80000) * 0.10
    }
  }

  const totalResources = studentContribution + parentalContribution
  let osapEligible = Math.max(0, totalCosts - totalResources)

  let grantPortion = 0
  let loanPortion = 0

  if (osapEligible > 0) {
    if (income < 50000) {
      grantPortion = Math.min(osapEligible * 0.60, 10000)
    } else if (income < 80000) {
      grantPortion = Math.min(osapEligible * 0.40, 6000)
    } else {
      grantPortion = Math.min(osapEligible * 0.20, 3000)
    }
    loanPortion = osapEligible - grantPortion
  }

  return {
    osapEligible,
    grantPortion,
    loanPortion,
    totalCosts,
    tuition,
    books,
    livingCosts,
    totalResources,
    studentContribution,
    parentalContribution,
    period
  }
}
