import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pf-theme') || 'system'
  })

  useEffect(() => {
    const applyTheme = (t) => {
      const root = document.documentElement
      if (t === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        root.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
      } else {
        root.setAttribute('data-theme', t)
      }
    }

    applyTheme(theme)
    localStorage.setItem('pf-theme', theme)

    // Watch system preference changes when in 'system' mode
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = () => {
      if (theme === 'system') applyTheme('system')
    }
    mq.addEventListener('change', onSystemChange)
    return () => mq.removeEventListener('change', onSystemChange)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'dark') return 'light'
      if (prev === 'light') return 'system'
      return 'dark'
    })
  }

  const setSpecificTheme = (t) => setTheme(t)

  // Derive the actual resolved theme for icon display
  const resolvedTheme = (() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  })()

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, toggleTheme, setSpecificTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
