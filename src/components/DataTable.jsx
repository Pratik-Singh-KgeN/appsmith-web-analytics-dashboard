import React, { useState } from 'react';
import { format } from 'date-fns';

export default function DataTable({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const sortedData = React.useMemo(() => {
    const sortable = [...data];
    sortable.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (sortConfig.key === 'date') {
        aVal = aVal.getTime();
        bVal = bVal.getTime();
      }
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sortable;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // toggle direction
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const getHeaderClass = (key) => {
    return sortConfig.key === key ? `sorted-${sortConfig.direction}` : '';
  };

  return (
    <div className="card table-wrapper" id="table">
      <table className="table">
        <thead>
          <tr>
            <th
              className={getHeaderClass('date')}
              onClick={() => requestSort('date')}
              tabIndex={0}
            >
              Date
            </th>
            <th
              className={getHeaderClass('visitors')}
              onClick={() => requestSort('visitors')}
              tabIndex={0}
            >
              Visitors
            </th>
            <th
              className={getHeaderClass('duration')}
              onClick={() => requestSort('duration')}
              tabIndex={0}
            >
              Avg Session (s)
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.date.toISOString()}>
              <td>{format(row.date, 'PPP')}</td>
              <td>{row.visitors}</td>
              <td>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
