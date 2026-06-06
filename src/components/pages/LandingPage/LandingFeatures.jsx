import { Col, Container, Row } from 'react-bootstrap'

const FEATURE_GRADIENTS = [
  'linear-gradient(135deg,#00D2FF22,#0066AA11)',
  'linear-gradient(135deg,#6366F122,#8B5CF611)',
  'linear-gradient(135deg,#10B98122,#05966911)',
  'linear-gradient(135deg,#F59E0B22,#D9770611)',
  'linear-gradient(135deg,#EF535022,#DC262611)',
  'linear-gradient(135deg,#8B5CF622,#7C3AED11)',
]

export default function LandingFeatures({ features }) {
  return (
    <section className="py-5 landing-features-section">
      <Container>
        <div className="mb-5 text-center animate-fade-up">
          <span className="section-tag">✨ Fitur</span>
          <h2 className="fw-bold mt-2">Fitur Unggulan</h2>
          <p style={{ maxWidth: 480, margin: '0 auto' }}>
            Semua yang Anda butuhkan untuk pengalaman parkir terbaik
          </p>
        </div>

        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={feature.title} md={6} lg={4}>
              <div
                className="feature-card animate-fade-up"
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <div
                  className="feature-icon-wrap"
                  style={{ background: FEATURE_GRADIENTS[index % FEATURE_GRADIENTS.length] }}
                >
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <h5 className="feature-title">{feature.title}</h5>
                <p className="feature-desc">{feature.desc}</p>
                <div className="feature-arrow">→</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}
