import { Suspense, lazy } from 'react'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'

// Lazy-load the 3D component – only loads when this section mounts
const CarModel3D = lazy(() => import('../../3d/CarModel3D'))

function HeroCarFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: 380,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div className="canvas-3d-fallback" style={{ fontSize: 100 }}>🚗</div>
    </div>
  )
}

export default function LandingHero({ onPrimaryCta, onSecondaryCta }) {
  return (
    <section className="hero-section">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-overlay" />
      </div>

      <Container
        className="position-relative"
        style={{ zIndex: 1, paddingTop: 120, paddingBottom: 100 }}
      >
        <Row className="align-items-center g-5">
          {/* Left – Content */}
          <Col lg={6}>
            <div className="animate-fade-up">
              <span className="section-tag">
                🅿️ Smart Parking System
              </span>

              <h1 className="hero-title mb-3">
                Parkir Cerdas,{' '}
                <br />
                <span className="gradient-text">Tanpa Repot</span>
              </h1>

              <p className="hero-desc mb-4">
                ParkFinder membantu Anda menemukan dan memesan slot parkir
                secara <strong>real-time</strong>. Amankan tempat sebelum tiba — cepat,
                mudah, dan terpercaya.
              </p>

              {/* Stats inline */}
              <div className="hero-inline-stats mb-5">
                {[
                  { val: '150+', label: 'Gedung' },
                  { val: '50K+', label: 'Pengguna' },
                  { val: '99%',  label: 'Berhasil' },
                  { val: '24/7', label: 'Layanan' },
                ].map(s => (
                  <div key={s.label} className="hero-stat-item">
                    <span className="hero-stat-val">{s.val}</span>
                    <span className="hero-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="d-flex flex-wrap gap-3">
                <Button
                  className="btn-pf-primary btn btn-lg"
                  onClick={onPrimaryCta}
                  id="hero-cta-primary"
                >
                  🅿️ Pesan Parkir Sekarang
                </Button>
                <Button
                  className="btn-pf-outline btn btn-lg"
                  onClick={onSecondaryCta}
                  id="hero-cta-secondary"
                >
                  🔍 Lihat Slot Tersedia
                </Button>
              </div>
            </div>
          </Col>

          {/* Right – 3D Car */}
          <Col lg={6} className="animate-fade-up delay-2">
            <div className="hero-3d-container">
              <Suspense fallback={<HeroCarFallback />}>
                <CarModel3D
                  height={520}
                  scale={6.5}
                  autoRotate={true}
                  fov={28}
                  cameraPos={[2.2, 0.4, 2.2]}
                />
              </Suspense>

              {/* Floating badge */}
              <div className="hero-badge-float hero-badge-left animate-fade-up delay-4">
                <span>🟢</span>
                <span>
                  <strong style={{ color: 'var(--pf-text)', display: 'block', fontSize: 13 }}>Slot Tersedia</strong>
                  <small style={{ color: 'var(--pf-text3)', fontSize: 11 }}>Real-time update</small>
                </span>
              </div>

              <div className="hero-badge-float hero-badge-right animate-fade-up delay-5">
                <span>⚡</span>
                <span>
                  <strong style={{ color: 'var(--pf-text)', display: 'block', fontSize: 13 }}>Booking Instan</strong>
                  <small style={{ color: 'var(--pf-text3)', fontSize: 11 }}>{'< 30 detik'}</small>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
