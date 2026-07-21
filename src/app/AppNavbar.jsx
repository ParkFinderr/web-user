import { useEffect, useState } from 'react'
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../shared/context/ThemeContext'
import { getActiveBookings } from '../shared/utils/bookingStore'

const CDN = 'https://storage.googleapis.com/parkfinderbucket'

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()
  const icon = theme === 'dark' ? <FaMoon /> : <FaSun />
  const label = theme === 'dark' ? 'Gelap' : 'Terang'

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={`Tema: ${label}`}
      aria-label={`Ganti tema, sekarang: ${label}`}
      style={{
        background: 'var(--pf-bg3)',
        border: '1.5px solid var(--pf-border)',
        borderRadius: '10px',
        width: '38px',
        height: '38px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--pf-text)'
      }}
    >
      <span style={{ fontSize: 16, display: 'flex' }}>{icon}</span>
    </button>
  )
}

export default function AppNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [activeCount, setActiveCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const update = () => setActiveCount(getActiveBookings().length)
    update()
    window.addEventListener('focus', update)
    return () => window.removeEventListener('focus', update)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (path) => {
    navigate(path)
    setExpanded(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const links = [
    { to: '/',           label: 'Kembali Ke Beranda', end: true },
    { to: '/scan',       label: 'Pindai Tiket',     end: false },
    { to: '/parking',    label: 'Daftar Area',    end: false },
    { to: '/my-booking', label: 'Status Parkir', end: false, badge: activeCount },
  ]

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className={`navbar-pf px-0 ${scrolled ? 'scrolled' : ''}`}
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand
          onClick={() => handleNav('/parking')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, fontWeight: 'bold', color: 'var(--pf-text)' }}
        >
          <img
            src={`${CDN}/foto/logo.png`}
            alt="ParkFinder"
            style={{ height: 38, width: 'auto', objectFit: 'contain' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <span>ParkFinder</span>
        </Navbar.Brand>

        {/* Mobile: theme toggle + hamburger */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          <ThemeToggleButton />
          <Navbar.Toggle aria-controls="pf-nav" />
        </div>

        <Navbar.Collapse id="pf-nav">
          <Nav className="mx-auto gap-1">
            {links.map(({ to, label, end, badge }) => (
              <Nav.Link
                key={to}
                as={NavLink}
                to={to}
                end={end}
                onClick={() => setExpanded(false)}
                className="d-flex align-items-center gap-1"
              >
                {label}
                {badge > 0 && (
                  <Badge
                    pill
                    style={{
                      fontSize: 10,
                      background: 'var(--pf-accent)',
                      color: 'white',
                      fontWeight: 700,
                    }}
                  >
                    {badge}
                  </Badge>
                )}
              </Nav.Link>
            ))}
          </Nav>

          {/* Desktop: theme toggle + CTA */}
          <div className="d-flex align-items-center gap-3">
            <span className="d-none d-lg-flex">
              <ThemeToggleButton />
            </span>
            <div className="d-flex align-items-center gap-3">
              <Button
                className="btn-pf-primary btn"
                onClick={() => handleNav('/parking')}
              >
                Cari Parkir
              </Button>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
