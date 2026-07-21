import { useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../shared/context/ThemeContext'

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

export default function LandingNavbar() {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  const { resolvedTheme } = useTheme()

  const handleNav = (path, state) => {
    navigate(path, state ? { state } : undefined)
    setExpanded(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className="navbar-pf px-0"
    >
      <Container>
        <Navbar.Brand
          onClick={() => handleNav('/')}
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

        <div className="d-flex align-items-center gap-2 d-lg-none">
          <ThemeToggleButton />
          <Navbar.Toggle aria-controls="landing-nav" />
        </div>

        <Navbar.Collapse id="landing-nav">
          <Nav className="mx-auto gap-1">
            <Nav.Link as={NavLink} to="/" end onClick={() => setExpanded(false)}>Beranda</Nav.Link>
            <Nav.Link as={NavLink} to="/tentang-project" onClick={() => setExpanded(false)}>Tentang Proyek</Nav.Link>
            <Nav.Link as={NavLink} to="/download-mobile" onClick={() => setExpanded(false)}>Unduh Aplikasi</Nav.Link>
            <Nav.Link as={NavLink} to="/tutorial" onClick={() => setExpanded(false)}>Tutorial</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3">
            <span className="d-none d-lg-flex">
              <ThemeToggleButton />
            </span>
            <Button className="btn-pf-primary btn" onClick={() => handleNav('/scan', { redirect: '/parking' })}>
              Pindai &amp; Pesan
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
