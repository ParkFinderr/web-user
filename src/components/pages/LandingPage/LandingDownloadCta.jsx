import { Card, Col, Container, Row } from 'react-bootstrap'
import { GuestService } from '../../../services/api'

const CDN = 'https://storage.googleapis.com/parkfinderbucket'

export default function LandingDownloadCta({ cdn }) {
  return (
    <section className="py-5" style={{ background: 'var(--pf-bg2)', borderTop: '1px solid var(--pf-border)' }}>
      <Container>
        <Card className="shadow-glow">
          <Card.Body className="p-5">
            <Row className="align-items-center g-4">
              <Col lg={7}>
                <span className="section-tag mb-3 d-inline-flex">📲 Mobile App</span>
                <h2 className="fw-bold mb-3">
                  Download Aplikasi{' '}
                  <span className="gradient-text">ParkFinder</span>
                </h2>
                <p className="mb-4" style={{ fontSize: 16 }}>
                  Nikmati pengalaman parkir yang lebih mudah dengan aplikasi mobile kami.
                  Scan tiket, navigasi ke slot, dan kelola parkir Anda di mana saja.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  {['android', 'ios'].map(platform => (
                    <a
                      key={platform}
                      href={GuestService.getDownloadAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-btn download-btn-lg"
                      id={`download-${platform}`}
                    >
                      <span className="download-btn-icon">
                        <img
                          src={`${cdn}/foto/${platform}.png`}
                          alt={platform}
                          style={{ width: 28, height: 28, objectFit: 'contain' }}
                          onError={e => { e.target.style.display = 'none' }}
                        />
                      </span>
                      <span className="download-btn-text">
                        <small>Download via</small>
                        <strong>{platform === 'android' ? 'Android' : 'iOS'}</strong>
                      </span>
                    </a>
                  ))}
                </div>
              </Col>
              <Col lg={5} className="text-center">
                <div className="app-download-visual">
                  <div className="app-phone-mockup">
                    <span style={{ fontSize: 64 }}>📱</span>
                    <div className="app-phone-glow" />
                  </div>
                  <div className="app-feature-pills">
                    {['QR Scan ✓', 'Real-time ✓', 'Booking ✓'].map(f => (
                      <span key={f} className="app-feature-pill">{f}</span>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <style>{`
        .app-download-visual { display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .app-phone-mockup {
          position: relative; width: 100px; height: 100px;
          display: flex; align-items: center; justify-content: center;
          filter: drop-shadow(0 8px 24px var(--pf-accent-glow));
          animation: float 3.5s ease-in-out infinite;
        }
        .app-feature-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .app-feature-pill {
          padding: 6px 14px; border-radius: 100px;
          background: var(--pf-accent-glow); color: var(--pf-accent);
          font-size: 12px; font-weight: 700;
          border: 1px solid var(--pf-border2);
        }
      `}</style>
    </section>
  )
}
