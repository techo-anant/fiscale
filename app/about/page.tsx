'use client'

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Fiscale</h1>
          <p className="about-hero-subtitle">
            Simple, powerful financial management for students and young professionals
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content-center">
            <h2 className="about-heading-center">Our Mission</h2>
            <p className="about-text-large">
              At Fiscale, we believe financial literacy should be accessible to everyone. We're building tools that make it easy for students and young professionals to understand their money, track their spending, and build healthy financial habits.
            </p>
            <p className="about-text-large">
              Our goal is simple: help you take control of your finances without the complexity of traditional banking apps.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-section about-section-gray">
        <div className="about-container">
          <h2 className="about-heading-center">What We Offer</h2>
          <div className="about-features-grid">
            <div className="about-feature-card">
              <div className="about-feature-icon">📊</div>
              <h3 className="about-feature-title">Expense Tracking</h3>
              <p className="about-feature-text">
                Track every dollar and see exactly where your money goes each month.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">💰</div>
              <h3 className="about-feature-title">Budget Planning</h3>
              <p className="about-feature-text">
                Set budgets and get insights on your spending patterns to stay on track.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">🎯</div>
              <h3 className="about-feature-title">Savings Goals</h3>
              <p className="about-feature-text">
                Create goals and track your progress toward your financial milestones.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">🎓</div>
              <h3 className="about-feature-title">OSAP Calculator</h3>
              <p className="about-feature-text">
                Estimate your OSAP funding and plan your student finances effectively.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">🧮</div>
              <h3 className="about-feature-title">Tax Calculator</h3>
              <p className="about-feature-text">
                Calculate your taxes and understand your take-home income accurately.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">🔒</div>
              <h3 className="about-feature-title">Private & Secure</h3>
              <p className="about-feature-text">
                Your data stays on your device. We never sell or share your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-heading-center">Our Principles</h2>
          <div className="about-values-grid">
            <div className="about-value-item">
              <h3 className="about-value-title">🎨 Simplicity</h3>
              <p className="about-value-text">
                We believe managing money shouldn't be complicated. Clean design, simple tools.
              </p>
            </div>

            <div className="about-value-item">
              <h3 className="about-value-title">🌟 Transparency</h3>
              <p className="about-value-text">
                No hidden fees, no surprises. Everything is upfront and easy to understand.
              </p>
            </div>

            <div className="about-value-item">
              <h3 className="about-value-title">💪 Empowerment</h3>
              <p className="about-value-text">
                We give you the tools and insights to make smart financial decisions independently.
              </p>
            </div>

            <div className="about-value-item">
              <h3 className="about-value-title">🤝 User-First</h3>
              <p className="about-value-text">
                Built for real people with real needs. Your feedback shapes what we build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-section about-section-gray">
        <div className="about-container">
          <div className="about-content-center">
            <h2 className="about-heading-center">Why Fiscale?</h2>
            <p className="about-text-large">
              Traditional financial apps are built for everyone, which means they work for no one. Students have unique needs: OSAP, part-time income, tight budgets, and limited financial knowledge.
            </p>
            <p className="about-text-large">
              Fiscale was built specifically to address these challenges. Simple enough for daily use, powerful enough to give you real control over your finances.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}