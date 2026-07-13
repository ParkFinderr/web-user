import { Col, Container, Row } from 'react-bootstrap'

const FEATURE_COLORS = [
  '#00D2FF', '#6366F1', '#10B981',
  '#F59E0B', '#EF5350', '#8B5CF6',
]

const FEATURE_ABBR = ['SR', 'BK', 'QR', 'NV', 'NT', 'AM']

export default function LandingFeatures({ features }) {
  return (
    <section className="py-5 landing-features-section">
      <Container>
        <div className="mb-5 text-center animate-fade-up">
          <div className="section-label">Fitur</div>
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
                  style={{ background: `${FEATURE_COLORS[index % FEATURE_COLORS.length]}18` }}
                >
                  <span
                    className="feature-abbr"
                    style={{ color: FEATURE_COLORS[index % FEATURE_COLORS.length] }}
                  >
                    {FEATURE_ABBR[index % FEATURE_ABBR.length]}
                  </span>
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
