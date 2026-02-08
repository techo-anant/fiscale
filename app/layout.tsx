import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'StudentFinance - Smart Money Manager',
  description: 'Complete student finance management tool with budget tracking, expense tracking, income tracking, savings goals, tax calculator, and OSAP estimator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
