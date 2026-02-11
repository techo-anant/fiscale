# Fiscale 💰

A complete student finance management app built with Next.js for Winhacks 2026. We built this to help students track expenses, manage budgets, calculate taxes, and estimate OSAP funding all in one place.

## What It Does

This app has everything I needed as a student to manage my finances:

- **Quick Overview** - See your balance, expenses, income, and savings rate at a glance
- **Expense Tracking** - Log expenses by category and watch where your money goes
- **Income Management** - Track all your income sources
- **Savings Goals** - Set goals and track your progress
- **Tax Calculator** - Calculate Canadian taxes with support for all provinces
- **OSAP Estimator** - Estimate your OSAP funding before you apply

## Getting Started

```bash
# Clone the repo
git clone https://github.com/techo-anant/fiscale.git

# Install dependencies
npm install

# Run it locally
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Breakdown

### Dashboard
The main dashboard shows your fixed monthly costs (rent, insurance, groceries, etc.) and calculates how much money you actually have available to spend after savings and bills. It also gives you budget insights and spending breakdowns by category.

### Expenses Tab
Add and track all your expenses. We included 5 main categories:
- Food & Dining
- Transportation
- Entertainment
- Shopping
- Other

Each expense shows up in a clean list with the date and category badge.

### Income Tab
Track all your income sources - whether it's from a part-time job, scholarships, or family support. The total income feeds into all the other calculations.

### Goals Tab
Set savings goals with target amounts and dates. The progress bars show you how close you are to hitting each goal.

### Tax Calculator
One of the most useful features we built. Enter your T4 and T2202 info and it calculates:
- Federal and provincial taxes
- All the student tax credits (tuition, education, textbook)
- CPP and EI credits
- Your refund or amount owing

It works for all 10 Canadian provinces and saves you the headache of doing it manually.

### OSAP Estimator
Estimate your OSAP funding by entering:
- Your student status and study period
- Income (yours and your parents')
- Tuition and book costs
- Living situation

The calculator breaks down grants vs loans and gives you a monthly repayment estimate.

## Tech Stack

- **Next.js 14** - Using the App Router
- **React 18** - For the UI
- **TypeScript** - Type safety throughout
- **CSS3** - Custom styling, no UI libraries
- **LocalStorage** - All your data stays on your device

## Project Structure

```
app/
├── page.tsx          # Main app logic
├── layout.tsx        # Root layout
└── globals.css       # All the styling

components/
├── QuickStats.tsx       # Top stat cards
├── TabNavigation.tsx    # Tab switcher
├── DashboardTab.tsx     # Fixed costs & available funds
├── ExpensesTab.tsx      # Expense tracker
├── IncomeTab.tsx        # Income tracker
├── GoalsTab.tsx         # Savings goals
├── TaxTab.tsx           # Tax calculator
└── OSAPTab.tsx          # OSAP estimator

utils/
├── calculations.ts      # OSAP math
└── taxCalculations.ts   # Tax math

hooks/
└── useLocalStorage.ts   # Data persistence

types/
└── index.ts             # TypeScript types
```

## Data Persistence

Everything you enter is saved to your browser's localStorage, so your data persists between sessions. Nothing gets sent to a server - it all stays local.

## Important Notes

- The tax calculations are estimates based on 2024 rates. Always file your actual taxes through CRA or a tax professional.
- OSAP estimates are just that - estimates. Apply through the official OSAP website for real funding amounts.
- All data is stored locally in your browser. Clear your browser data and you'll lose it.

## Contributing

Feel free to open issues or submit PRs if you find bugs or want to add features.

## The Team

Built by a team of 4 for Winhacks 2026.

## License

MIT

---

Built to help students manage their finances better. Hope it helps! 🎓