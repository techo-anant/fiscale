export interface Expense {
  id: number
  description: string
  amount: number
  category: string
  date: string
}

export interface Income {
  id: number
  source: string
  amount: number
  date: string
}

export interface Goal {
  id: number
  name: string
  targetAmount: number
  currentAmount: number
  targetDate: string
}

export interface FixedCosts {
  rent: number
  carInsurance: number
  groceries: number
  phone: number
  utilities: number
  other: number
}

export interface TaxResults {
  income: number
  basicPersonalAmount: number
  taxableIncome: number
  federalTax: number
  provincialTax: number
  totalTaxBeforeCredits: number
  basicPersonalCredit: number
  tuitionCredit: number
  educationAmount: number
  textbookAmount: number
  cppCredit: number
  eiCredit: number
  totalCredits: number
  totalTaxOwed: number
  taxDeducted: number
  refundOrOwing: number
  unusedTuition: number
  studyMonths: number
}

export interface OSAPResults {
  osapEligible: number
  grantPortion: number
  loanPortion: number
  totalCosts: number
  tuition: number
  books: number
  livingCosts: number
  totalResources: number
  studentContribution: number
  parentalContribution: number
  period: number
}
