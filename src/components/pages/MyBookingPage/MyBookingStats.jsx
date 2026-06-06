export default function MyBookingStats({ activeCount, expiredCount, totalCount }) {
  const stats = [
    {
      id: 'stat-active',
      icon: '🟢',
      value: activeCount,
      label: 'Parkiran Aktif',
      color: 'var(--pf-green)',
      bg: 'var(--pf-green-bg)',
      border: 'rgba(76,175,80,0.3)',
    },
    {
      id: 'stat-completed',
      icon: '✓',
      value: expiredCount,
      label: 'Selesai / Kedaluwarsa',
      color: 'var(--pf-text3)',
      bg: 'var(--pf-card2)',
      border: 'var(--pf-border)',
    },
    {
      id: 'stat-total',
      icon: '🅿️',
      value: totalCount,
      label: 'Total Booking',
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
          <div className="booking-stat-icon" style={{ color: s.color }}>{s.icon}</div>
          <div className="booking-stat-value" style={{ color: s.color }}>{s.value}</div>
          <div className="booking-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
