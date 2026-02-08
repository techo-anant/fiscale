import { TaxResults } from '@/types'

const provincialRates: { [key: string]: { brackets: number[], rates: number[] } } = {
  ON: {
    brackets: [49231, 98463, 150000, 220000],
    rates: [0.0505, 0.0915, 0.1116, 0.1216, 0.1316]
  },
  BC: {
    brackets: [45654, 91310, 104835, 127299, 172602, 240716],
    rates: [0.0506, 0.077, 0.105, 0.1229, 0.147, 0.168, 0.205]
  },
  AB: {
    brackets: [142292, 170751, 227668, 341502],
    rates: [0.10, 0.12, 0.13, 0.14, 0.15]
  },
  QC: {
    brackets: [49275, 98540, 119910],
    rates: [0.15, 0.20, 0.24, 0.2575]
  },
  MB: {
    brackets: [36842, 79625],
    rates: [0.108, 0.1275, 0.174]
  },
  SK: {
    brackets: [49720, 142058],
    rates: [0.105, 0.125, 0.145]
  },
  NS: {
    brackets: [29590, 59180, 93000, 150000],
    rates: [0.0879, 0.1495, 0.1667, 0.175, 0.21]
  },
  NB: {
    brackets: [47715, 95431, 176756],
    rates: [0.094, 0.14, 0.16, 0.195]
  },
  PE: {
    brackets: [31984, 63969],
    rates: [0.098, 0.138, 0.167]
  },
  NL: {
    brackets: [41457, 82913, 148027, 207239, 264750, 529500, 1059000],
    rates: [0.087, 0.145, 0.158, 0.173, 0.183, 0.198, 0.208, 0.218]
  }
}

const federalBrackets = [53359, 106717, 165430, 235675]
const federalRates = [0.15, 0.205, 0.26, 0.29, 0.33]

function calculateTaxOnIncome(income: number, brackets: number[], rates: number[]): number {
  let tax = 0
  let previousBracket = 0

  for (let i = 0; i < brackets.length; i++) {
    if (income > brackets[i]) {
      tax += (brackets[i] - previousBracket) * rates[i]
      previousBracket = brackets[i]
    } else {
      tax += (income - previousBracket) * rates[i]
      return tax
    }
  }

  tax += (income - previousBracket) * rates[rates.length - 1]
  return tax
}

export function calculateCanadianTax(
  province: string,
  income: number,
  taxDeducted: number,
  tuitionFees: number,
  studyMonths: number,
  cppBox16: number,
  eiBox18: number,
  otherIncome: number = 0
): TaxResults {
  const totalIncome = income + otherIncome
  const basicPersonalAmount = 15705
  const taxableIncome = Math.max(0, totalIncome - basicPersonalAmount)

  const federalTax = calculateTaxOnIncome(taxableIncome, federalBrackets, federalRates)
  
  const provRates = provincialRates[province] || provincialRates.ON
  const provincialTax = calculateTaxOnIncome(taxableIncome, provRates.brackets, provRates.rates)
  
  const totalTaxBeforeCredits = federalTax + provincialTax

  const basicPersonalCredit = basicPersonalAmount * (0.15 + (provRates.rates[0] || 0.0505))
  const tuitionCredit = tuitionFees * (0.15 + (provRates.rates[0] || 0.0505))
  const educationAmount = studyMonths > 0 ? studyMonths * (400 * 0.15 + 200 * (provRates.rates[0] || 0.0505)) : 0
  const textbookAmount = studyMonths > 0 ? studyMonths * 65 * 0.15 : 0
  const cppCredit = cppBox16 * 0.15
  const eiCredit = eiBox18 * 0.15

  const totalCredits = basicPersonalCredit + tuitionCredit + educationAmount + textbookAmount + cppCredit + eiCredit

  let totalTaxOwed = Math.max(0, totalTaxBeforeCredits - totalCredits)
  const unusedTuition = Math.max(0, (tuitionCredit + educationAmount + textbookAmount) - totalTaxBeforeCredits)
  const refundOrOwing = taxDeducted - totalTaxOwed

  return {
    income: totalIncome,
    basicPersonalAmount,
    taxableIncome,
    federalTax,
    provincialTax,
    totalTaxBeforeCredits,
    basicPersonalCredit,
    tuitionCredit,
    educationAmount,
    textbookAmount,
    cppCredit,
    eiCredit,
    totalCredits,
    totalTaxOwed,
    taxDeducted,
    refundOrOwing,
    unusedTuition,
    studyMonths
  }
}
