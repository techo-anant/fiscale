interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'expenses', label: '💳 Expenses' },
    { id: 'income', label: '💵 Income' },
    { id: 'goals', label: '🎯 Goals' },
    { id: 'tax', label: '🧮 Tax Calc' },
    { id: 'osap', label: '🎓 OSAP' },
  ]

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
