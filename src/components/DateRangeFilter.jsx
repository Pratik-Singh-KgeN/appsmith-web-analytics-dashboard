import React from 'react';
import { format, parseISO } from 'date-fns';

export default function DateRangeFilter({ startDate, endDate, onChange }) {
  const handleStartChange = (e) => {
    const newDate = e.target.value ? parseISO(e.target.value) : null;
    onChange({ startDate: newDate, endDate });
  };

  const handleEndChange = (e) => {
    const newDate = e.target.value ? parseISO(e.target.value) : null;
    onChange({ startDate, endDate: newDate });
  };

  return (
    <div className="card" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <label>
        From:{' '}
        <input
          type="date"
          className="input"
          value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
          onChange={handleStartChange}
        />
      </label>
      <label>
        To:{' '}
        <input
          type="date"
          className="input"
          value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
          onChange={handleEndChange}
        />
      </label>
    </div>
  );
}
