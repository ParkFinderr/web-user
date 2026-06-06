import { Col, Container, Row } from 'react-bootstrap'

const STEP_ICONS = ['📍', '🅿️', '📱', '🚗']
const STEP_COLORS = [
  'linear-gradient(135deg,#00D2FF,#0066AA)',
  'linear-gradient(135deg,#6366F1,#8B5CF6)',
  'linear-gradient(135deg,#10B981,#059669)',
  'linear-gradient(135deg,#F59E0B,#D97706)',
]

export default function LandingSteps({ steps }) {
  return (
    <section className="py-5 landing-steps-section">
      <Container>
        <div className="mb-5 text-center animate-fade-up">
          <span className="section-tag">📋 Cara Kerja</span>
          <h2 className="fw-bold mt-2">4 Langkah Mudah</h2>
          <p style={{ maxWidth: 480, margin: '0 auto' }}>
            Dari pencarian hingga parkir — selesai dalam hitungan menit
          </p>
        </div>

        {/* Desktop: horizontal stepper */}
        <div className="steps-horizontal d-none d-md-flex">
          {steps.map((step, i) => (
            <div key={step.num} className="step-item-h animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="step-icon-wrap" style={{ background: STEP_COLORS[i] }}>
                <span className="step-icon-emoji">{STEP_ICONS[i]}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="step-connector">
                  <div className="step-connector-line" />
                  <div className="step-connector-dot" />
                </div>
              )}
              <div className="step-num-badge">{step.num}</div>
              <h5 className="step-title">{step.title}</h5>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical list */}
        <div className="steps-vertical d-md-none">
          {steps.map((step, i) => (
            <div key={step.num} className="step-item-v animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="step-v-left">
                <div className="step-icon-wrap-sm" style={{ background: STEP_COLORS[i] }}>
                  <span>{STEP_ICONS[i]}</span>
                </div>
                {i < steps.length - 1 && <div className="step-v-line" />}
              </div>
              <div className="step-v-content">
                <div className="step-num-sm">{step.num}</div>
                <h5 className="step-title">{step.title}</h5>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
