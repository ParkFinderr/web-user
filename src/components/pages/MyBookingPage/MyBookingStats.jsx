export default function MyBookingStats({ activeCount, expiredCount, totalCount }) {
  const stats = [
    {
      id: 'stat-active',
      abbr: 'AK',
      value: activeCount,
      label: 'Aktif',
      color: 'var(--pf-green)',
      bg: 'var(--pf-green-bg)',
      border: 'rgba(76,175,80,0.3)',
    },
    {
      id: 'stat-completed',
      abbr: 'SE',
      value: expiredCount,
      label: 'Selesai',
      color: 'var(--pf-text3)',
      bg: 'var(--pf-card2)',
      border: 'var(--pf-border)',
    },
    {
      id: 'stat-total',
      abbr: 'TO',
      value: totalCount,
      label: 'Total',
      color: 'var(--pf-accent)',
      bg: 'var(--pf-accent-glow)',
      border: 'var(--pf-border2)',
    },
  ]

  return (
    <div className="booking-stats-row mb-4">
      {stats.map(s => (
        <div
          key={s.id}
          id={s.id}
          className="booking-stat-card"
          style={{ background: s.bg, borderColor: s.border }}
        >
          <div className="booking-stat-abbr" style={{ color: s.color }}>{s.abbr}</div>
          <div className="booking-stat-value" style={{ color: s.color }}>{s.value}</div>
          <div className="booking-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
