import React from 'react';

export default function TentBookings() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tent & Equipment Bookings</h1>
          <p className="page-description">Calendar of marquees, canopies and stage equipment.</p>
        </div>
        <button className="btn-primary">+ New Booking (via Order)</button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button className="btn-secondary">← Prev</button>
          <h2 style={{ fontSize: 16, fontFamily: 'Georgia, serif' }}>August 2026</h2>
          <button className="btn-secondary">Next →</button>
        </div>

        <div className="calendar-grid">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <div key={day} className="cal-header">{day}</div>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
            <div key={day} className="cal-day">
              <div>{day}</div>
              {day === 30 && <div className="cal-event">Marquee Tent (20x30 ft)</div>}
              {day === 31 && <div className="cal-event">Marquee Tent (20x30 ft)</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}