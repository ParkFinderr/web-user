import { Badge, Button, Card, Col, Row } from 'react-bootstrap'

export default function ParkingSlotPanel({
  selected,
  floors,
  floor,
  onFloorChange,
  currentFloor,
  selectedSlot,
  onSelectSlot,
  onBook,
}) {
  const slotItems = currentFloor.rawSlots?.length
    ? currentFloor.rawSlots
    : currentFloor.slots.map((slot, index) => ({
        displayName: slot,
        slotKey: `${currentFloor.id}-${slot}-${index}`,
        isAvailable: currentFloor.available[index],
      }))

  if (!selected) {
    return (
      <Card className="h-100">
        <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: 420 }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>P</div>
          <h5 style={{ color: 'var(--pf-text)' }}>Pilih Gedung Parkir</h5>
          <p style={{ maxWidth: 280 }}>Klik gedung di sebelah kiri untuk melihat slot yang tersedia</p>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3 gap-3">
          <div>
            <h6 style={{ color: 'var(--pf-text)', marginBottom: 4 }}>{selected.name}</h6>
            <small style={{ color: 'var(--pf-text3)' }}>{selected.address}</small>
          </div>
          <Badge className={`badge-pf-${selected.tagClass}`}>{selected.tag}</Badge>
        </div>

        <div className="d-flex gap-2 mb-3 flex-wrap">
          {floors.map(floorOption => (
            <Button
              key={floorOption.id}
              size="sm"
              className={floorOption.id === floor ? 'btn-pf-primary btn' : 'btn-pf-ghost btn'}
              onClick={() => onFloorChange(floorOption.id)}
            >
              {floorOption.id}
            </Button>
          ))}
        </div>

        <div className="slot-legend">
          {[['#4CAF50', 'Tersedia'], ['#EF5350', 'Terisi'], ['#00D2FF', 'Dipilih']].map(([color, label]) => (
            <span key={label} className="slot-legend-item">
              <span style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>

        <Row className="g-2 mb-4">
          {slotItems.map((slot, index) => {
            const isAvailable = slot.isAvailable ?? currentFloor.available[index]
            const isSelected = selectedSlot?.slotKey === slot.slotKey

            return (
              <Col xs={6} sm={4} md={3} key={slot.slotKey || slot.id || `${slot.displayName}-${index}`}>
                <button
                  className={`slot-btn w-100 ${!isAvailable ? 'slot-taken' : ''} ${isSelected ? 'slot-picked' : ''}`}
                  onClick={() => isAvailable && onSelectSlot(slot)}
                  disabled={!isAvailable}
                >
                  {slot.displayName}
                </button>
              </Col>
            )
          })}
        </Row>

        {selectedSlot && (
          <div className="slot-action-box">
            <div className="d-flex justify-content-between align-items-center mb-3 gap-3">
              <span style={{ fontSize: 14, color: 'var(--pf-text2)' }}>Slot dipilih:</span>
              <strong style={{ color: 'var(--pf-accent)', fontSize: 16 }}>{selectedSlot.displayName} - {floor}</strong>
            </div>
            <Button className="btn-pf-primary btn w-100" onClick={onBook}>
              Pesan Sekarang
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
