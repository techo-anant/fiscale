'use client'

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">Smart Financial Management</div>
          <h1 className="hero-title">Finance tracking trusted by thousands</h1>
          <p className="hero-description">
            Take control of your money. Track expenses, manage budget and reach your financial goals by <b>doing the right thing</b>.
          </p>
          <a href="/dashboard" className="btn btn-primary">
            Get started
          </a>
        </div>

        <div className="hero-visual">
          <img src="static/HeroImage.png" alt="Fiscale Hero Image" />
        </div>
      </section>
    </div>
  )
}