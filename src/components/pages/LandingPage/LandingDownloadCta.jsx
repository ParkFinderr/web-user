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
                <div className="section-label mb-3">Mobile App</div>
                <h2 className="fw-bold mb-3">
                  Download Aplikasi{' '}
                  <span className="gradient-text">ParkFinder</span>
                </h2>
                <p className="mb-4" style={{ fontSize: 16 }}>
                  Nikmati pengalaman parkir yang lebih mudah dengan aplikasi mobile kami.
                  Scan tiket, navigasi ke slot, dan kelola parkir Anda di mana saja.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  {[
                    { platform: 'android', label: 'Android' },
                    { platform: 'ios',     label: 'iOS' },
                  ].map(({ platform, label }) => (
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
                          alt={label}
                          style={{ width: 28, height: 28, objectFit: 'contain' }}
                          onError={e => { e.target.style.display = 'none' }}
                        />
                      </span>
                      <span className="download-btn-text">
                        <small>Download via</small>
                        <strong>{label}</strong>
                      </span>
                    </a>
                  ))}
                </div>
              </Col>
              <Col lg={5} className="text-center">
                <div className="app-download-visual">
                  <div className="app-phone-mockup-box">
                    <div className="app-phone-screen">
                      <div className="app-phone-screen-inner">
                        <div className="app-phone-logo">P</div>
                        <div className="app-phone-bar" />
                        <div className="app-phone-bar app-phone-bar--short" />
                        <div className="app-phone-bar" />
                      </div>
                    </div>
                  </div>
                  <div className="app-feature-pills">
                    {['QR Scan', 'Real-time', 'Booking'].map(f => (
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
        .app-download-visual { display: flex; flex-direction: column; align-items: center; gap: 20px; }

        .app-phone-mockup-box {
          width: 100px; height: 160px;
          border: 3px solid var(--pf-border2);
          border-radius: 20px;
          background: var(--pf-card2);
          display: flex; align-items: center; justify-content: center;
          position: relative;
          animation: float 3.5s ease-in-out infinite;
          box-shadow: 0 12px 32px rgba(0,0,0,0.2), 0 0 0 1px var(--pf-border);
        }
        .app-phone-mockup-box::before {
          content: '';
          position: absolute;
          top: 10px;
          width: 30px; height: 4px;
          background: var(--pf-border2);
          border-radius: 2px;
        }
        .app-phone-screen {
          width: 80px; height: 120px;
          background: var(--pf-bg);
          border-radius: 10px;
          margin-top: 14px;
          padding: 12px 10px;
          display: flex; align-items: flex-start;
        }
        .app-phone-screen-inner { width: 100%; display: flex; flex-direction: column; gap: 6px; }
        .app-phone-logo {
          width: 24px; height: 24px;
          background: var(--pf-accent);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 900; font-size: 13px;
          margin-bottom: 4px;
        }
        .app-phone-bar {
          height: 5px; border-radius: 3px;
          background: var(--pf-border2); width: 100%;
        }
        .app-phone-bar--short { width: 60%; }

        .app-feature-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .app-feature-pill {
          padding: 5px 14px; border-radius: 100px;
          background: var(--pf-card2); color: var(--pf-text2);
          font-size: 12px; font-weight: 600;
          border: 1px solid var(--pf-border);
        }
      `}</style>
    </section>
  )
}
